
export interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
  fraudScore: number;
  riskLevel: string;
  isBlacklisted: boolean;
  blacklistCount: number;
  blacklists: { [key: string]: boolean };
  vpnDetected: boolean;
  proxyDetected: boolean;
}
