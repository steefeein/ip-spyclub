
interface IPScoreLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
}

interface IPScoreBlacklist {
  ip: string;
  blacklists: {
    [key: string]: boolean;
  };
  isBlacklisted: boolean;
  blacklistCount: number;
}

interface IPScoreFull extends IPScoreLocation {
  blacklists: {
    [key: string]: boolean;
  };
  isBlacklisted: boolean;
  blacklistCount: number;
}

export class IPAnalysisService {
  private static readonly BASE_URL = 'https://ip-score.com';

  // Get location and ISP for current IP
  static async getCurrentIPInfo(): Promise<IPScoreLocation> {
    try {
      const response = await fetch(`${this.BASE_URL}/json`);
      if (!response.ok) {
        throw new Error('Failed to fetch IP info');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current IP info:', error);
      throw error;
    }
  }

  // Get location and ISP for custom IP
  static async getCustomIPInfo(ip: string): Promise<IPScoreLocation> {
    try {
      const formData = new FormData();
      formData.append('ip', `"${ip}"`);
      
      const response = await fetch(`${this.BASE_URL}/json`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP info');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching custom IP info:', error);
      throw error;
    }
  }

  // Get blacklist info for current IP
  static async getCurrentIPBlacklist(): Promise<IPScoreBlacklist> {
    try {
      const response = await fetch(`${this.BASE_URL}/spamjson`);
      if (!response.ok) {
        throw new Error('Failed to fetch blacklist info');
      }
      const data = await response.json();
      return {
        ...data,
        isBlacklisted: Object.values(data.blacklists || {}).some(Boolean),
        blacklistCount: Object.values(data.blacklists || {}).filter(Boolean).length,
      };
    } catch (error) {
      console.error('Error fetching current IP blacklist:', error);
      throw error;
    }
  }

  // Get blacklist info for custom IP
  static async getCustomIPBlacklist(ip: string): Promise<IPScoreBlacklist> {
    try {
      const formData = new FormData();
      formData.append('ip', `"${ip}"`);
      
      const response = await fetch(`${this.BASE_URL}/spamjson`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blacklist info');
      }
      const data = await response.json();
      return {
        ...data,
        isBlacklisted: Object.values(data.blacklists || {}).some(Boolean),
        blacklistCount: Object.values(data.blacklists || {}).filter(Boolean).length,
      };
    } catch (error) {
      console.error('Error fetching custom IP blacklist:', error);
      throw error;
    }
  }

  // Get full info (location + blacklist) for current IP
  static async getCurrentIPFull(): Promise<IPScoreFull> {
    try {
      const response = await fetch(`${this.BASE_URL}/fulljson`);
      if (!response.ok) {
        throw new Error('Failed to fetch full IP info');
      }
      const data = await response.json();
      return {
        ...data,
        isBlacklisted: Object.values(data.blacklists || {}).some(Boolean),
        blacklistCount: Object.values(data.blacklists || {}).filter(Boolean).length,
      };
    } catch (error) {
      console.error('Error fetching current IP full info:', error);
      throw error;
    }
  }

  // Get full info (location + blacklist) for custom IP
  static async getCustomIPFull(ip: string): Promise<IPScoreFull> {
    try {
      const formData = new FormData();
      formData.append('ip', `"${ip}"`);
      
      const response = await fetch(`${this.BASE_URL}/fulljson`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch full IP info');
      }
      const data = await response.json();
      return {
        ...data,
        isBlacklisted: Object.values(data.blacklists || {}).some(Boolean),
        blacklistCount: Object.values(data.blacklists || {}).filter(Boolean).length,
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
