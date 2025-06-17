
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { IPAnalysisService } from '@/services/ipAnalysisService';
import { IPInfo } from '@/types/ip';

export const useIPAnalysis = () => {
  const [currentIP, setCurrentIP] = useState<string>('');
  const [ipInfo, setIPInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [autoLoaded, setAutoLoaded] = useState<boolean>(false);

  // Fetch IP info using real APIs
  const fetchIPInfo = async (ip?: string) => {
    setLoading(true);
    
    try {
      let locationData;
      let blacklistData;
      let scamalyticsData;

      if (ip) {
        // For custom IP, get full data
        const fullData = await IPAnalysisService.getCustomIPFull(ip);
        locationData = fullData;
        blacklistData = fullData;
        scamalyticsData = await IPAnalysisService.getScamalyticsAnalysis(ip);
      } else {
        // For current IP, get full data
        const fullData = await IPAnalysisService.getCurrentIPFull();
        locationData = fullData;
        blacklistData = fullData;
        scamalyticsData = await IPAnalysisService.getScamalyticsAnalysis(fullData.ip);
        setCurrentIP(fullData.ip);
      }

      const combinedInfo: IPInfo = {
        ip: locationData.ip,
        city: locationData.city || 'Unknown',
        region: locationData.region || 'Unknown',
        country: locationData.country || 'Unknown',
        isp: locationData.isp || 'Unknown',
        org: locationData.org || 'Unknown',
        timezone: locationData.timezone || 'Unknown',
        lat: locationData.lat || 0,
        lon: locationData.lon || 0,
        fraudScore: scamalyticsData.fraudScore,
        riskLevel: scamalyticsData.riskLevel,
        isBlacklisted: blacklistData.isBlacklisted || false,
        blacklistCount: blacklistData.blacklistCount || 0,
        blacklists: blacklistData.blacklists || {},
        vpnDetected: scamalyticsData.vpnDetected,
        proxyDetected: scamalyticsData.proxyDetected,
      };

      setIPInfo(combinedInfo);
      
      toast({
        title: "Succes",
        description: "Informațiile IP au fost încărcate cu succes",
      });
    } catch (error) {
      console.error('Error fetching IP info:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca informațiile IP. Verifică conexiunea și încearcă din nou.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  // Auto-load current IP info on mount
  useEffect(() => {
    if (!autoLoaded) {
      fetchIPInfo();
      setAutoLoaded(true);
    }
  }, [autoLoaded]);

  return {
    currentIP,
    ipInfo,
    loading,
    fetchIPInfo
  };
};
