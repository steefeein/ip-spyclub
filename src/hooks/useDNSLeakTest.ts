
import { useState } from 'react';
import { DNSLeakTestService } from '@/services/dnsLeakTestService';

interface DNSServer {
  ip: string;
  hostname?: string;
  country?: string;
  isp?: string;
  type?: 'resolver' | 'authoritative';
}

interface DNSLeakTestResult {
  servers: DNSServer[];
  leakDetected: boolean;
  userLocation?: {
    country: string;
    region: string;
  };
  testStatus: 'running' | 'completed' | 'error';
  message?: string;
}

export const useDNSLeakTest = () => {
  const [testResult, setTestResult] = useState<DNSLeakTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      console.log('Starting DNS leak test...');
      const result = await DNSLeakTestService.performDNSLeakTest();
      console.log('DNS leak test result:', result);
      setTestResult(result);
    } catch (error) {
      console.error('DNS leak test failed:', error);
      setTestResult({
        servers: [],
        leakDetected: false,
        testStatus: 'error',
        message: 'Eroare în timpul testului DNS. Încearcă din nou.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testResult,
    isLoading,
    runTest
  };
};
