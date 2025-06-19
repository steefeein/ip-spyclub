
import { DNSServer } from '@/types/dns';

export const generateRandomString = (length: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const detectLeak = (dnsServers: DNSServer[], userCountry: string): boolean => {
  return dnsServers.some(server => 
    server.country && server.country.toLowerCase() !== userCountry.toLowerCase()
  );
};

export const calculateAverageResponseTime = (servers: DNSServer[]): number => {
  if (servers.length === 0) return 0;
  return servers.reduce((sum, server) => sum + (server.responseTime || 0), 0) / servers.length;
};

export const getUniqueCountries = (servers: DNSServer[]): number => {
  return [...new Set(servers.map(s => s.country))].filter(c => c !== 'Unknown').length;
};

export const getUniqueISPs = (servers: DNSServer[]): number => {
  return [...new Set(servers.map(s => s.isp))].filter(isp => isp !== 'Unknown ISP').length;
};

export const groupServersByProvider = (servers: DNSServer[]) => {
  return {
    opendns: servers.filter(s => s.isp?.toLowerCase().includes('opendns')),
    cloudflare: servers.filter(s => s.isp?.toLowerCase().includes('cloudflare')),
    quad9: servers.filter(s => s.isp?.toLowerCase().includes('quad9')),
    google: servers.filter(s => s.isp?.toLowerCase().includes('google'))
  };
};
