
export interface IPInfo {
  query: string; // Adding missing query property
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
  mobile?: boolean; // Adding missing mobile property
  proxy?: boolean;  // Adding missing proxy property  
  hosting?: boolean; // Adding missing hosting property
  // New Scamalytics detailed fields
  ispScore?: number;
  ispRisk?: string;
  isDatacenter?: boolean;
  isAppleRelay?: boolean;
  isAmazonAws?: boolean;
  isGoogle?: boolean;
  proxyType?: string;
  blacklistSources?: string[];
}
