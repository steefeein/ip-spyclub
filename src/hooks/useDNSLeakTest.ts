
import { useState } from 'react';
import { DNSServer, DNSLeakTestResult } from '@/types/dns';
import { DNSLeakTestService } from '@/services/dnsLeakTestService';

export const useDNSLeakTest = () => {
  const [testResult, setTestResult] = useState<DNSLeakTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentServers, setCurrentServers] = useState<DNSServer[]>([]);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    setCurrentServers([]);
    
    try {
      console.log('🚀 Starting real DNS leak test with browserleaks.org...');
      
      const onServerDetected = (server: DNSServer) => {
        setCurrentServers(prev => [...prev, server]);
      };
      
      const result = await DNSLeakTestService.performDNSLeakTest(undefined, onServerDetected);
      console.log('✅ DNS leak test completed:', result);
      setTestResult(result);
    } catch (error) {
      console.error('❌ DNS leak test failed:', error);
      setTestResult({
        servers: currentServers,
        leakDetected: false,
        testStatus: 'error',
        message: `❌ Eroare în timpul testului DNS: ${error instanceof Error ? error.message : 'Eroare necunoscută'}`,
        testDetails: {
          totalServers: currentServers.length,
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
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testResult,
    isLoading,
    currentServers,
    runTest
  };
};
