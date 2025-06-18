
import { useState } from 'react';
import { DNSLeakTestService } from '@/services/dnsLeakTestService';

interface DNSServer {
  ip: string;
  hostname?: string;
  country?: string;
  isp?: string;
  type?: 'resolver' | 'authoritative';
  location?: string;
  asn?: string;
  org?: string;
  responseTime?: number;
  protocol?: string;
  port?: number;
  reliability?: 'high' | 'medium' | 'low';
}

interface DNSLeakTestResult {
  servers: DNSServer[];
  leakDetected: boolean;
  userLocation?: {
    country: string;
    region: string;
    city: string;
    isp: string;
    asn: string;
  };
  testStatus: 'running' | 'completed' | 'error';
  message?: string;
  testDetails: {
    totalServers: number;
    uniqueCountries: number;
    uniqueISPs: number;
    averageResponseTime: number;
    testDuration: number;
    timestamp: string;
  };
  additionalSources: {
    opendns: DNSServer[];
    cloudflare: DNSServer[];
    quad9: DNSServer[];
    google: DNSServer[];
  };
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
        message: 'Eroare în timpul testului DNS. Încearcă din nou.',
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
          google: []
        }
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
