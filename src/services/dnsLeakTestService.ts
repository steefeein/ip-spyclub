
import { DNSServer, DNSLeakTestResult, DNSTestConfig } from '@/types/dns';
import { DNSApiClient } from './dnsApiClient';
import { 
  delay, 
  detectLeak, 
  calculateAverageResponseTime, 
  getUniqueCountries, 
  getUniqueISPs, 
  groupServersByProvider 
} from '@/utils/dnsUtils';

export class DNSLeakTestService {
  static async performDNSLeakTest(userIP?: string, onServerDetected?: (server: DNSServer) => void): Promise<DNSLeakTestResult> {
    console.log('🚀 Starting DNS leak test with browserleaks.org API...');
    console.log('📋 Running 4 tests total: 2 IPv4 + 2 IPv6');
    
    const startTime = Date.now();
    const servers: DNSServer[] = [];
    
    try {
      const tests: DNSTestConfig[] = [
        { isIPv6: false, testNum: 1 },
        { isIPv6: false, testNum: 2 },
        { isIPv6: true, testNum: 3 },
        { isIPv6: true, testNum: 4 }
      ];

      for (const test of tests) {
        console.log(`📡 DNS Test ${test.testNum}/4 (${test.isIPv6 ? 'IPv6' : 'IPv4'}) - Generating new random subdomain...`);
        
        const dnsData = await DNSApiClient.fetchDNSData(test.testNum, test.isIPv6);
        
        if (dnsData) {
          const detectedServers = DNSApiClient.parseDNSResponse(dnsData, test.testNum, test.isIPv6);
          
          detectedServers.forEach(server => {
            servers.push(server);
            console.log(`✅ Server ${test.testNum} detected:`, server);
            
            if (onServerDetected) {
              onServerDetected(server);
            }
          });
        } else {
          console.warn(`⚠️ No data received from API for test ${test.testNum}`);
        }
        
        if (test.testNum < 4) {
          console.log('⏳ Waiting 1 second before next request...');
          await delay(1000);
        }
      }

      const endTime = Date.now();
      const testDuration = endTime - startTime;
      
      const averageResponseTime = calculateAverageResponseTime(servers);
      const uniqueCountries = getUniqueCountries(servers);
      const uniqueISPs = getUniqueISPs(servers);
      
      const userCountry = userIP ? 'Romania' : 'Unknown';
      const leakDetected = detectLeak(servers, userCountry);

      const additionalSources = groupServersByProvider(servers);

      const result: DNSLeakTestResult = {
        servers,
        leakDetected,
        userLocation: {
          country: userCountry,
          region: 'Constanța County',
          city: 'Constanța',
          isp: 'Digi Romania',
          asn: 'AS8953'
        },
        testStatus: 'completed',
        message: leakDetected 
          ? `🚨 DNS leak detectat! Am găsit ${servers.length} servere DNS din ${uniqueCountries} țări diferite.`
          : `✅ Nu s-au detectat DNS leak-uri. Am analizat ${servers.length} servere DNS.`,
        testDetails: {
          totalServers: servers.length,
          uniqueCountries,
          uniqueISPs,
          averageResponseTime: Math.round(averageResponseTime),
          testDuration,
          timestamp: new Date().toISOString()
        },
        additionalSources
      };

      console.log('🎉 DNS leak test completed successfully:', result);
      return result;
      
    } catch (error) {
      console.error('💥 DNS leak test failed:', error);
      return {
        servers,
        leakDetected: false,
        testStatus: 'error',
        message: `❌ Eroare în timpul testului DNS: ${error instanceof Error ? error.message : 'Eroare necunoscută'}`,
        testDetails: {
          totalServers: servers.length,
          uniqueCountries: 0,
          uniqueISPs: 0,
          averageResponseTime: 0,
          testDuration: Date.now() - startTime,
          timestamp: new Date().toISOString()
        },
        additionalSources: {
          opendns: [],
          cloudflare: [],
          quad9: [],
          google: []
        }
      };
    }
  }
}
