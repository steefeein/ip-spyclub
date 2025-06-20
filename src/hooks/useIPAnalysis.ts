
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
        console.log('🔍 Fetching data for custom IP:', ip);
        const fullData = await IPAnalysisService.getCustomIPFull(ip);
        locationData = fullData;
        blacklistData = fullData;
        scamalyticsData = await IPAnalysisService.getScamalyticsAnalysis(ip);
      } else {
        // For current IP, get full data
        console.log('🔍 Fetching data for current IP');
        const fullData = await IPAnalysisService.getCurrentIPFull();
        locationData = fullData;
        blacklistData = fullData;
        scamalyticsData = await IPAnalysisService.getScamalyticsAnalysis(fullData.ip);
        setCurrentIP(fullData.ip);
      }

      const combinedInfo: IPInfo = {
        query: locationData.ip,
        ip: locationData.ip,
        city: locationData.city || 'Unknown',
        region: locationData.region || 'Unknown',
        country: locationData.country || 'Unknown',
        citySecondary: locationData.citySecondary,
        regionSecondary: locationData.regionSecondary,
        countrySecondary: locationData.countrySecondary,
        zipSecondary: locationData.zipSecondary,
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
        userAgent: locationData.userAgent,
        asn: locationData.asn,
        zip: locationData.zip,
        mobile: locationData.mobile || false,
        proxy: locationData.proxy || false,
        hosting: locationData.hosting || false,
        // New Scamalytics detailed fields
        ispScore: scamalyticsData.ispScore,
        ispRisk: scamalyticsData.ispRisk,
        isDatacenter: scamalyticsData.isDatacenter,
        isAppleRelay: scamalyticsData.isAppleRelay,
        isAmazonAws: scamalyticsData.isAmazonAws,
        isGoogle: scamalyticsData.isGoogle,
        proxyType: scamalyticsData.proxyType,
        blacklistSources: scamalyticsData.blacklistSources,
      };

      setIPInfo(combinedInfo);
      
      // Show success message - no more CORS issues!
      toast({
        title: "✅ Succes complet",
        description: "Toate informațiile IP au fost încărcate cu succes via Supabase Edge Functions",
      });
    } catch (error) {
      console.error('Error fetching IP info:', error);
      toast({
        title: "❌ Eroare",
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
