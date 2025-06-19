
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ip } = await req.json();
    
    if (!ip) {
      return new Response(
        JSON.stringify({ error: 'IP address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get secrets from environment
    const scamalyticsUser = Deno.env.get('SCAMALYTICS_USER');
    const scamalyticsApiKey = Deno.env.get('SCAMALYTICS_API_KEY');

    if (!scamalyticsUser || !scamalyticsApiKey) {
      console.error('Missing Scamalytics credentials');
      return new Response(
        JSON.stringify({ error: 'Scamalytics credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Scamalytics API
    const scamalyticsUrl = `https://api11.scamalytics.com/v3/${scamalyticsUser}/?key=${scamalyticsApiKey}&ip=${ip}`;
    
    console.log(`🔍 Calling Scamalytics API for IP: ${ip}`);
    
    const scamalyticsResponse = await fetch(scamalyticsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'IP-Spy-App/1.0',
      },
    });

    if (!scamalyticsResponse.ok) {
      throw new Error(`Scamalytics API error: ${scamalyticsResponse.status}`);
    }

    const scamalyticsData: ScamalyticsResponse = await scamalyticsResponse.json();
    
    console.log('✅ Scamalytics response received successfully');

    // Process and return the data
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
    if (scamalyticsData.external_datasources?.ipsum?.ip_blacklisted) {
      blacklistSources.push('IPSum');
    }
    if (scamalyticsData.external_datasources?.spamhaus_drop?.ip_blacklisted) {
      blacklistSources.push('Spamhaus');
    }
    if (scamalyticsData.external_datasources?.ip2proxy_lite?.ip_blacklisted) {
      blacklistSources.push('IP2Proxy');
    }
    if (scamalyticsData.external_datasources?.x4bnet?.is_blacklisted_spambot) {
      blacklistSources.push('X4BNet');
    }

    const processedData = {
      fraudScore: scamalyticsData.scamalytics?.scamalytics_score || 0,
      riskLevel: getRiskLevel(scamalyticsData.scamalytics?.scamalytics_risk, scamalyticsData.scamalytics?.scamalytics_score),
      vpnDetected: scamalyticsData.scamalytics?.scamalytics_proxy?.is_vpn || false,
      proxyDetected: scamalyticsData.scamalytics?.scamalytics_proxy?.is_datacenter || false,
      ispScore: scamalyticsData.scamalytics?.scamalytics_isp_score || 0,
      ispRisk: getIspRiskLevel(scamalyticsData.scamalytics?.scamalytics_isp_risk, scamalyticsData.scamalytics?.scamalytics_isp_score),
      isDatacenter: scamalyticsData.scamalytics?.scamalytics_proxy?.is_datacenter || false,
      isAppleRelay: scamalyticsData.scamalytics?.scamalytics_proxy?.is_apple_icloud_private_relay || false,
      isAmazonAws: scamalyticsData.scamalytics?.scamalytics_proxy?.is_amazon_aws || false,
      isGoogle: scamalyticsData.scamalytics?.scamalytics_proxy?.is_google || false,
      proxyType: scamalyticsData.external_datasources?.ip2proxy_lite?.proxy_type || 'Unknown',
      blacklistSources: blacklistSources,
    };

    return new Response(
      JSON.stringify(processedData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in Scamalytics analysis:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze IP',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
