
export interface DNSServer {
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

export interface DNSLeakTestResult {
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
    local: DNSServer[];
    public: DNSServer[];
    isp: DNSServer[];
    international: DNSServer[];
  };
}

export interface DNSTestConfig {
  isIPv6: boolean;
  testNum: number;
}
