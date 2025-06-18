
export interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  // Secondary geo data from geoip2
  citySecondary?: string;
  regionSecondary?: string;
  countrySecondary?: string;
  zipSecondary?: string;
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
  // Additional details
  userAgent?: string;
  asn?: string;
  zip?: string;
}
