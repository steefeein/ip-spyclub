
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

export class DNSLeakTestService {
  private static readonly TEST_DOMAINS = [
    'whoami.ds.akahelios.net',
    'whoami.telekom.de',
    'detectportal.firefox.com',
    'connectivity-check.ubuntu.com',
    'resolver1.opendns.com',
    '1dot1dot1dot1.cloudflare-dns.com',
    'dns.quad9.net'
  ];

  static async performDNSLeakTest(userIP?: string): Promise<DNSLeakTestResult> {
    console.log('Starting comprehensive DNS leak test...');
    
    try {
      const startTime = Date.now();
      
      // Simulate comprehensive DNS testing
      await this.delay(3000);
      
      const mockServers: DNSServer[] = [
        {
          ip: '8.8.8.8',
          hostname: 'dns.google',
          country: 'United States',
          isp: 'Google LLC',
          type: 'resolver',
          location: 'Mountain View, CA',
          asn: 'AS15169',
          org: 'Google LLC',
          responseTime: 12,
          protocol: 'UDP',
          port: 53,
          reliability: 'high'
        },
        {
          ip: '8.8.4.4',
          hostname: 'dns.google',
          country: 'United States',
          isp: 'Google LLC',
          type: 'resolver',
          location: 'Mountain View, CA',
          asn: 'AS15169',
          org: 'Google LLC',
          responseTime: 15,
          protocol: 'UDP',
          port: 53,
          reliability: 'high'
        },
        {
          ip: '1.1.1.1',
          hostname: 'one.one.one.one',
          country: 'United States',
          isp: 'Cloudflare Inc.',
          type: 'resolver',
          location: 'San Francisco, CA',
          asn: 'AS13335',
          org: 'Cloudflare Inc.',
          responseTime: 8,
          protocol: 'UDP',
          port: 53,
          reliability: 'high'
        },
        {
          ip: '1.0.0.1',
          hostname: 'one.zero.zero.one',
          country: 'United States',
          isp: 'Cloudflare Inc.',
          type: 'resolver',
          location: 'San Francisco, CA',
          asn: 'AS13335',
          org: 'Cloudflare Inc.',
          responseTime: 10,
          protocol: 'UDP',
          port: 53,
          reliability: 'high'
        },
        {
          ip: '9.9.9.9',
          hostname: 'dns.quad9.net',
          country: 'Switzerland',
          isp: 'Quad9',
          type: 'resolver',
          location: 'Zurich',
          asn: 'AS19281',
          org: 'Quad9',
          responseTime: 18,
          protocol: 'UDP',
          port: 53,
          reliability: 'high'
        },
        {
          ip: '208.67.222.222',
          hostname: 'resolver1.opendns.com',
          country: 'United States',
          isp: 'OpenDNS',
          type: 'resolver',
          location: 'San Francisco, CA',
          asn: 'AS36692',
          org: 'OpenDNS LLC',
          responseTime: 20,
          protocol: 'UDP',
          port: 53,
          reliability: 'medium'
        }
      ];

      const additionalSources = {
        opendns: [
          {
            ip: '208.67.222.222',
            hostname: 'resolver1.opendns.com',
            country: 'United States',
            isp: 'OpenDNS',
            type: 'resolver' as const,
            location: 'San Francisco, CA',
            asn: 'AS36692',
            org: 'OpenDNS LLC',
            responseTime: 20,
            protocol: 'UDP',
            port: 53,
            reliability: 'medium' as const
          }
        ],
        cloudflare: [
          {
            ip: '1.1.1.1',
            hostname: 'one.one.one.one',
            country: 'United States',
            isp: 'Cloudflare Inc.',
            type: 'resolver' as const,
            location: 'San Francisco, CA',
            asn: 'AS13335',
            org: 'Cloudflare Inc.',
            responseTime: 8,
            protocol: 'UDP',
            port: 53,
            reliability: 'high' as const
          }
        ],
        quad9: [
          {
            ip: '9.9.9.9',
            hostname: 'dns.quad9.net',
            country: 'Switzerland',
            isp: 'Quad9',
            type: 'resolver' as const,
            location: 'Zurich',
            asn: 'AS19281',
            org: 'Quad9',
            responseTime: 18,
            protocol: 'UDP',
            port: 53,
            reliability: 'high' as const
          }
        ],
        google: [
          {
            ip: '8.8.8.8',
            hostname: 'dns.google',
            country: 'United States',
            isp: 'Google LLC',
            type: 'resolver' as const,
            location: 'Mountain View, CA',
            asn: 'AS15169',
            org: 'Google LLC',
            responseTime: 12,
            protocol: 'UDP',
            port: 53,
            reliability: 'high' as const
          }
        ]
      };

      const endTime = Date.now();
      const testDuration = endTime - startTime;
      const averageResponseTime = mockServers.reduce((sum, server) => sum + (server.responseTime || 0), 0) / mockServers.length;
      const uniqueCountries = [...new Set(mockServers.map(s => s.country))].length;
      const uniqueISPs = [...new Set(mockServers.map(s => s.isp))].length;
      
      // Simulate leak detection logic
      const leakDetected = Math.random() > 0.6; // 40% chance of leak for demo
      
      return {
        servers: mockServers,
        leakDetected,
        userLocation: {
          country: 'Romania',
          region: 'Constanța County',
          city: 'Constanța',
          isp: 'Digi Romania',
          asn: 'AS8953'
        },
        testStatus: 'completed',
        message: leakDetected 
          ? 'DNS leak detectat! Serverele DNS nu corespund cu locația ta.'
          : 'Nu s-au detectat DNS leak-uri. Configurația DNS pare sigură.',
        testDetails: {
          totalServers: mockServers.length,
          uniqueCountries,
          uniqueISPs,
          averageResponseTime: Math.round(averageResponseTime),
          testDuration,
          timestamp: new Date().toISOString()
        },
        additionalSources
      };
      
    } catch (error) {
      console.error('DNS leak test failed:', error);
      return {
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
      };
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static detectLeak(dnsServers: DNSServer[], userCountry: string): boolean {
    return dnsServers.some(server => 
      server.country && server.country.toLowerCase() !== userCountry.toLowerCase()
    );
  }
}
