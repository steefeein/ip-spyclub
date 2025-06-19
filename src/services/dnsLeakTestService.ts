
import { DNSLeakTestResult } from '@/types/dns';
import { DNSLeakIframeService } from './dnsLeakIframeService';

export class DNSLeakTestService {
  static async performDNSLeakTest(userIP?: string, onServerDetected?: (server: any) => void): Promise<DNSLeakTestResult> {
    console.log('🚀 Starting DNS leak test with iframe communication...');
    
    try {
      return await DNSLeakIframeService.performDNSLeakTest(userIP, onServerDetected);
    } catch (error) {
      console.error('💥 DNS leak test failed:', error);
      return {
        servers: [],
        leakDetected: false,
        testStatus: 'error',
        message: `❌ Eroare în timpul testului DNS: ${error instanceof Error ? error.message : 'Eroare necunoscută'}. Testul necesită să fie rulat printr-un iframe pentru a evita restricțiile CORS.`,
        testDetails: {
          totalServers: 0,
          uniqueCountries: 0,
          uniqueISPs: 0,
          averageResponseTime: 0,
          testDuration: 0,
          timestamp: new Date().toISOString()
        },
        additionalSources: {
          opendns: [],
          cloudflare: [],
          quad9: [],
          google: [],
          local: [],
          public: [],
          isp: [],
          international: []
        }
      };
    }
  }
}
