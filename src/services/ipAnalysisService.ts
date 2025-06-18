
interface IPScoreResponse {
  ip: string;
  status: boolean;
  message?: string;
  geoip1?: {
    country: string;
    countrycode: string;
    region: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  geoip2?: {
    country: string;
    countrycode: string;
    region: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  blacklists?: {
    [key: string]: string;
  };
  isp?: string;
  org?: string;
  asn?: string;
}

export class IPAnalysisService {
  private static readonly BASE_URL = 'https://ip-score.com';

  // Get full info (location + blacklist) for current IP
  static async getCurrentIPFull(): Promise<{
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    org: string;
    timezone: string;
    lat: number;
    lon: number;
    isBlacklisted: boolean;
    blacklistCount: number;
    blacklists: { [key: string]: boolean };
  }> {
    try {
      const response = await fetch(`${this.BASE_URL}/fulljson`);
      if (!response.ok) {
        throw new Error('Failed to fetch IP info');
      }
      const data: IPScoreResponse = await response.json();
      
      if (!data.status) {
        throw new Error(data.message || 'API returned error status');
      }

      // Use geoip1 as primary, fallback to geoip2
      const geo = data.geoip1 || data.geoip2 || {};
      
      // Process blacklists
      const blacklists: { [key: string]: boolean } = {};
      if (data.blacklists) {
        Object.entries(data.blacklists).forEach(([key, value]) => {
          blacklists[key] = value === 'listed';
        });
      }

      return {
        ip: data.ip,
        city: geo.city || 'Unknown',
        region: geo.region || 'Unknown',
        country: geo.country || 'Unknown',
        isp: data.isp || 'Unknown',
        org: data.org || data.asn || 'Unknown',
        timezone: geo.timezone || 'Unknown',
        lat: geo.lat || 0,
        lon: geo.lon || 0,
        isBlacklisted: Object.values(blacklists).some(Boolean),
        blacklistCount: Object.values(blacklists).filter(Boolean).length,
        blacklists
      };
    } catch (error) {
      console.error('Error fetching current IP full info:', error);
      throw error;
    }
  }

  // Get full info (location + blacklist) for custom IP
  static async getCustomIPFull(ip: string): Promise<{
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    org: string;
    timezone: string;
    lat: number;
    lon: number;
    isBlacklisted: boolean;
    blacklistCount: number;
    blacklists: { [key: string]: boolean };
  }> {
    try {
      const formData = new FormData();
      formData.append('ip', ip); // Remove quotes around IP
      
      const response = await fetch(`${this.BASE_URL}/fulljson`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP info');
      }
      
      const data: IPScoreResponse = await response.json();
      
      if (!data.status) {
        throw new Error(data.message || 'IP invalid sau API error');
      }

      // Use geoip1 as primary, fallback to geoip2
      const geo = data.geoip1 || data.geoip2 || {};
      
      // Process blacklists
      const blacklists: { [key: string]: boolean } = {};
      if (data.blacklists) {
        Object.entries(data.blacklists).forEach(([key, value]) => {
          blacklists[key] = value === 'listed';
        });
      }

      return {
        ip: data.ip,
        city: geo.city || 'Unknown',
        region: geo.region || 'Unknown',
        country: geo.country || 'Unknown',
        isp: data.isp || 'Unknown',
        org: data.org || data.asn || 'Unknown',
        timezone: geo.timezone || 'Unknown',
        lat: geo.lat || 0,
        lon: geo.lon || 0,
        isBlacklisted: Object.values(blacklists).some(Boolean),
        blacklistCount: Object.values(blacklists).filter(Boolean).length,
        blacklists
      };
    } catch (error) {
      console.error('Error fetching custom IP full info:', error);
      throw error;
    }
  }

  // Placeholder for Scamalytics fraud analysis (when API key is available)
  static async getScamalyticsAnalysis(ip: string): Promise<{
    fraudScore: number;
    riskLevel: string;
    vpnDetected: boolean;
    proxyDetected: boolean;
  }> {
    // This will be implemented when Scamalytics API key is approved
    console.log('Scamalytics API integration pending approval');
    
    // Return mock data for now with a note that it's pending
    return {
      fraudScore: Math.floor(Math.random() * 30) + 5,
      riskLevel: 'Pending Scamalytics API approval',
      vpnDetected: Math.random() > 0.7,
      proxyDetected: Math.random() > 0.8,
    };
  }
}
