
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

interface GeoData {
  country?: string;
  countrycode?: string;
  region?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
}

export class IPAnalysisService {
  private static readonly BASE_URL = 'https://ip-score.com';

  // Get full info (location + blacklist) for current IP
  static async getCurrentIPFull(): Promise<{
    ip: string;
    city: string;
    region: string;
    country: string;
    citySecondary?: string;
    regionSecondary?: string;
    countrySecondary?: string;
    zipSecondary?: string;
    isp: string;
    org: string;
    timezone: string;
    lat: number;
    lon: number;
    isBlacklisted: boolean;
    blacklistCount: number;
    blacklists: { [key: string]: boolean };
    userAgent?: string;
    asn?: string;
    zip?: string;
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

      // Use geoip1 as primary, geoip2 as secondary
      const geo1: GeoData = data.geoip1 || {};
      const geo2: GeoData = data.geoip2 || {};
      
      // Process blacklists
      const blacklists: { [key: string]: boolean } = {};
      if (data.blacklists) {
        Object.entries(data.blacklists).forEach(([key, value]) => {
          blacklists[key] = value === 'listed';
        });
      }

      return {
        ip: data.ip,
        city: geo1.city || 'Unknown',
        region: geo1.region || 'Unknown',
        country: geo1.country || 'Unknown',
        citySecondary: geo2.city,
        regionSecondary: geo2.region,
        countrySecondary: geo2.country,
        zipSecondary: geo2.zip,
        isp: data.isp || 'Unknown',
        org: data.org || data.asn || 'Unknown',
        timezone: geo1.timezone || geo2.timezone || 'Unknown',
        lat: geo1.lat || geo2.lat || 0,
        lon: geo1.lon || geo2.lon || 0,
        isBlacklisted: Object.values(blacklists).some(Boolean),
        blacklistCount: Object.values(blacklists).filter(Boolean).length,
        blacklists,
        userAgent: (data as any).useragent,
        asn: data.asn,
        zip: geo1.zip
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
    citySecondary?: string;
    regionSecondary?: string;
    countrySecondary?: string;
    zipSecondary?: string;
    isp: string;
    org: string;
    timezone: string;
    lat: number;
    lon: number;
    isBlacklisted: boolean;
    blacklistCount: number;
    blacklists: { [key: string]: boolean };
    userAgent?: string;
    asn?: string;
    zip?: string;
  }> {
    try {
      const formData = new FormData();
      formData.append('ip', ip);
      
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

      // Use geoip1 as primary, geoip2 as secondary
      const geo1: GeoData = data.geoip1 || {};
      const geo2: GeoData = data.geoip2 || {};
      
      // Process blacklists
      const blacklists: { [key: string]: boolean } = {};
      if (data.blacklists) {
        Object.entries(data.blacklists).forEach(([key, value]) => {
          blacklists[key] = value === 'listed';
        });
      }

      return {
        ip: data.ip,
        city: geo1.city || 'Unknown',
        region: geo1.region || 'Unknown',
        country: geo1.country || 'Unknown',
        citySecondary: geo2.city,
        regionSecondary: geo2.region,
        countrySecondary: geo2.country,
        zipSecondary: geo2.zip,
        isp: data.isp || 'Unknown',
        org: data.org || data.asn || 'Unknown',
        timezone: geo1.timezone || geo2.timezone || 'Unknown',
        lat: geo1.lat || geo2.lat || 0,
        lon: geo1.lon || geo2.lon || 0,
        isBlacklisted: Object.values(blacklists).some(Boolean),
        blacklistCount: Object.values(blacklists).filter(Boolean).length,
        blacklists,
        userAgent: (data as any).useragent,
        asn: data.asn,
        zip: geo1.zip
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
