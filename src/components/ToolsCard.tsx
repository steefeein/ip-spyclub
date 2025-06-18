
import { Server, Globe, Clock, Shield, Network, Eye, Database, Zap, Search, Activity }from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ToolsCard = () => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300 lg:col-span-2 xl:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Server className="w-5 h-5 text-purple-400" />
          🛠️ Instrumente Adiționale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
          <Globe className="w-4 h-4 mr-2" />
          Traceroute (În dezvoltare)
        </Button>
        <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
          <Clock className="w-4 h-4 mr-2" />
          Ping Test (În dezvoltare)
        </Button>
        <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
          <Shield className="w-4 h-4 mr-2" />
          Port Scanner (În dezvoltare)
        </Button>
        
        <div className="pt-2 border-t border-slate-600/50">
          <Button variant="outline" className="w-full justify-start border-purple-600/50 text-purple-300 hover:bg-purple-700/20 hover:border-purple-500">
            <Network className="w-4 h-4 mr-2" />
            🔍 DNS Leak Test (Activ)
          </Button>
        </div>

        <div className="pt-2 border-t border-slate-600/50">
          <div className="text-xs text-gray-400 mb-2">🌐 Surse Suplimentare de Analiză:</div>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700 mb-1" disabled>
            <Eye className="w-4 h-4 mr-2" />
            📊 VirusTotal API (În dezvoltare)
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700 mb-1" disabled>
            <Database className="w-4 h-4 mr-2" />
            🛡️ AbuseIPDB (În dezvoltare)
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700 mb-1" disabled>
            <Zap className="w-4 h-4 mr-2" />
            🔍 Shodan API (În dezvoltare)
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700 mb-1" disabled>
            <Search className="w-4 h-4 mr-2" />
            🌐 MaxMind GeoIP2 (În dezvoltare)
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700 mb-1" disabled>
            <Activity className="w-4 h-4 mr-2" />
            📈 IPQualityScore (În dezvoltare)
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
            <Shield className="w-4 h-4 mr-2" />
            🛡️ ThreatCrowd API (În dezvoltare)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
