
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

interface ScamalyticsResponse {
  scamalytics: {
    status: string;
    mode: string;
    ip: string;
    scamalytics_score: number;
    scamalytics_risk: string;
    scamalytics_isp_score: number;
    scamalytics_isp_risk: string;
    scamalytics_proxy: {
      is_datacenter: boolean;
      is_vpn: boolean;
      is_apple_icloud_private_relay: boolean;
      is_amazon_aws: boolean;
      is_google: boolean;
    };
    is_blacklisted_external: boolean;
  };
  external_datasources: {
    ip2proxy_lite?: {
      proxy_type: string;
      ip_blacklisted: boolean;
      ip_blacklist_type: string;
    };
    ipsum?: {
      ip_blacklisted: boolean;
      num_blacklists: number;
    };
    spamhaus_drop?: {
      ip_blacklisted: boolean;
    };
    x4bnet?: {
      is_vpn: boolean;
      is_datacenter: boolean;
      is_blacklisted_spambot: boolean;
    };
  };
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
  private static readonly SCAMALYTICS_BASE_URL = 'https://api11.scamalytics.com/v3';
  private static readonly SCAMALYTICS_USER = 'robbine991';
  private static readonly SCAMALYTICS_API_KEY = '7a348dd1fdc92f06802c05e415a59d3e3e73c2c023bec98b0f666d69ec2eb5d5';

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

  // CORS-safe Scamalytics analysis with fallback data
  static async getScamalyticsAnalysis(ip: string): Promise<{
    fraudScore: number;
    riskLevel: string;
    vpnDetected: boolean;
    proxyDetected: boolean;
    ispScore: number;
    ispRisk: string;
    isDatacenter: boolean;
    isAppleRelay: boolean;
    isAmazonAws: boolean;
    isGoogle: boolean;
    proxyType: string;
    blacklistSources: string[];
  }> {
    console.log('🔍 Attempting Scamalytics API call for IP:', ip);
    
    try {
      // Try to make the request with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const url = `${this.SCAMALYTICS_BASE_URL}/${this.SCAMALYTICS_USER}/?key=${this.SCAMALYTICS_API_KEY}&ip=${ip}`;
      
      const response = await fetch(url, {
        signal: controller.signal,
        mode: 'cors'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Scamalytics API error: ${response.status}`);
      }
      
      const data: ScamalyticsResponse = await response.json();
      
      console.log('✅ Scamalytics response received:', data);
      
      // Map risk string to readable Romanian text
      const getRiskLevel = (risk: string, score: number) => {
        if (risk === 'very high' || score >= 75) return 'Risc foarte ridicat';
        if (risk === 'high' || score >= 50) return 'Risc ridicat';
        if (risk === 'medium' || score >= 25) return 'Risc moderat';
        return 'Risc scăzut';
      };

      const getIspRiskLevel = (risk: string, score: number) => {
        if (risk === 'very high' || score >= 75) return 'ISP Risc foarte ridicat';
        if (risk === 'high' || score >= 50) return 'ISP Risc ridicat';
        if (risk === 'medium' || score >= 25) return 'ISP Risc moderat';
        return 'ISP Risc scăzut';
      };

      // Collect blacklist sources
      const blacklistSources = [];
      if (data.external_datasources?.ipsum?.ip_blacklisted) {
        blacklistSources.push('IPSum');
      }
      if (data.external_datasources?.spamhaus_drop?.ip_blacklisted) {
        blacklistSources.push('Spamhaus');
      }
      if (data.external_datasources?.ip2proxy_lite?.ip_blacklisted) {
        blacklistSources.push('IP2Proxy');
      }
      if (data.external_datasources?.x4bnet?.is_blacklisted_spambot) {
        blacklistSources.push('X4BNet');
      }

      return {
        fraudScore: data.scamalytics?.scamalytics_score || 0,
        riskLevel: getRiskLevel(data.scamalytics?.scamalytics_risk, data.scamalytics?.scamalytics_score),
        vpnDetected: data.scamalytics?.scamalytics_proxy?.is_vpn || false,
        proxyDetected: data.scamalytics?.scamalytics_proxy?.is_datacenter || false,
        ispScore: data.scamalytics?.scamalytics_isp_score || 0,
        ispRisk: getIspRiskLevel(data.scamalytics?.scamalytics_isp_risk, data.scamalytics?.scamalytics_isp_score),
        isDatacenter: data.scamalytics?.scamalytics_proxy?.is_datacenter || false,
        isAppleRelay: data.scamalytics?.scamalytics_proxy?.is_apple_icloud_private_relay || false,
        isAmazonAws: data.scamalytics?.scamalytics_proxy?.is_amazon_aws || false,
        isGoogle: data.scamalytics?.scamalytics_proxy?.is_google || false,
        proxyType: data.external_datasources?.ip2proxy_lite?.proxy_type || 'Unknown',
        blacklistSources: blacklistSources,
      };
    } catch (error) {
      console.warn('⚠️ Scamalytics API blocked by CORS or failed:', error);
      
      // Return safe fallback data with CORS notification
      return {
        fraudScore: 0,
        riskLevel: '🚫 CORS Blocat - Folosește Supabase',
        vpnDetected: false,
        proxyDetected: false,
        ispScore: 0,
        ispRisk: '🚫 API Blocat',
        isDatacenter: false,
        isAppleRelay: false,
        isAmazonAws: false,
        isGoogle: false,
        proxyType: 'CORS Error',
        blacklistSources: [],
      };
    }
  }
}
