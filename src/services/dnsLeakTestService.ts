
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

export class DNSLeakTestService {
  private static readonly TEST_DOMAINS = [
    'whoami.ds.akahelios.net',
    'whoami.telekom.de',
    'detectportal.firefox.com',
    'connectivity-check.ubuntu.com'
  ];

  // Simulate DNS leak testing (in real implementation this would require backend)
  static async performDNSLeakTest(userIP?: string): Promise<DNSLeakTestResult> {
    console.log('Starting DNS leak test...');
    
    try {
      // In a real implementation, this would:
      // 1. Query multiple DNS resolvers
      // 2. Check which DNS servers are being used
      // 3. Compare DNS server locations with user location
      // 4. Detect potential leaks
      
      // For demo purposes, we'll simulate the test
      await this.delay(2000); // Simulate test duration
      
      const mockServers: DNSServer[] = [
        {
          ip: '8.8.8.8',
          hostname: 'dns.google',
          country: 'United States',
          isp: 'Google LLC',
          type: 'resolver'
        },
        {
          ip: '1.1.1.1',
          hostname: 'one.one.one.one',
          country: 'United States', 
          isp: 'Cloudflare Inc.',
          type: 'resolver'
        }
      ];

      // Simulate leak detection logic
      const leakDetected = Math.random() > 0.7; // 30% chance of leak for demo
      
      return {
        servers: mockServers,
        leakDetected,
        userLocation: {
          country: 'Romania',
          region: 'Constanța County'
        },
        testStatus: 'completed',
        message: leakDetected 
          ? 'DNS leak detectat! Serverele DNS nu corespund cu locația ta.'
          : 'Nu s-au detectat DNS leak-uri. Configurația DNS pare sigură.'
      };
      
    } catch (error) {
      console.error('DNS leak test failed:', error);
      return {
        servers: [],
        leakDetected: false,
        testStatus: 'error',
        message: 'Eroare în timpul testului DNS. Încearcă din nou.'
      };
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check if DNS servers match user location
  static detectLeak(dnsServers: DNSServer[], userCountry: string): boolean {
    return dnsServers.some(server => 
      server.country && server.country.toLowerCase() !== userCountry.toLowerCase()
    );
  }
}
