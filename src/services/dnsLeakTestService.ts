
import { DNSLeakTestResult } from '@/types/dns';
import { supabase } from '@/integrations/supabase/client';

export class DNSLeakTestService {
  static async performDNSLeakTest(userIP?: string, onServerDetected?: (server: any) => void): Promise<DNSLeakTestResult> {
    console.log('🚀 Starting DNS leak test via Supabase Edge Function...');
    
    try {
      const { data, error } = await supabase.functions.invoke('dns-leak-test', {
        body: { userIP }
      });
      
      if (error) {
        console.error('❌ Edge Function error:', error);
        throw new Error(`Edge Function failed: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('No data received from Edge Function');
      }
      
      // Notify about detected servers if callback provided
      if (onServerDetected && data.servers) {
        data.servers.forEach((server: any) => {
          onServerDetected(server);
        });
      }
      
      console.log('✅ DNS leak test completed via Edge Function:', data);
      return data as DNSLeakTestResult;
      
    } catch (error) {
      console.error('💥 DNS leak test failed:', error);
      return {
        servers: [],
        leakDetected: false,
        testStatus: 'error',
        message: `❌ Eroare în timpul testului DNS: ${error instanceof Error ? error.message : 'Eroare necunoscută'}`,
        testDetails: {
          totalServers: 0,
          uniqueCountries: 0,
          uniqueISPs: 0,
          averageResponseTime: 0,
          testDuration: 0,
          timestamp: new Date().toISOString()
        },
        additionalSources: {
          opendns: [],
          cloudflare: [],
          quad9: [],
          google: []
        }
      };
    }
  }
}
