
import { Wifi, Building, Hash, Globe, MapPin, Clock, Server, Zap, Signal, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface ISPCardProps {
  ipInfo: IPInfo;
}

export const ISPCard = ({ ipInfo }: ISPCardProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-300 hover:border-blue-400/70 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-sm">
          <div className="p-1.5 bg-blue-100 rounded-lg border border-blue-200">
            <Wifi className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-bold">
            🌐 Furnizor Internet
          </span>
          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 border-blue-200 text-xs">
            ISP
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Building className="w-3 h-3" />
                ISP:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-right max-w-[140px] truncate">
                {ipInfo.isp}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Globe className="w-3 h-3" />
                Organizație:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-right max-w-[140px] truncate">
                {ipInfo.org}
              </span>
            </div>
            
            {ipInfo.asn && (
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1 font-medium">
                  <Hash className="w-3 h-3" />
                  ASN:
                </span>
                <span className="text-slate-800 font-mono font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                  {ipInfo.asn}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3" />
                Locație:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-right max-w-[140px] truncate">
                {ipInfo.city}, {ipInfo.country}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" />
                Fus orar:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {ipInfo.timezone}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Signal className="w-3 h-3" />
                Coordonate:
              </span>
              <span className="text-slate-800 font-mono text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                {ipInfo.lat?.toFixed(4)}, {ipInfo.lon?.toFixed(4)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Network className="w-3 h-3" />
                Cod poștal:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {ipInfo.zip || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Server className="w-3 h-3" />
                Tip serviciu:
              </span>
              <div className="flex gap-1 flex-wrap">
                {ipInfo.mobile && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">📱 Mobile</Badge>
                )}
                {ipInfo.proxy && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">🔒 Proxy</Badge>
                )}
                {ipInfo.hosting && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">🖥️ Hosting</Badge>
                )}
                {!ipInfo.mobile && !ipInfo.proxy && !ipInfo.hosting && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">🏠 Rezidențial</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-emerald-700 text-xs font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Status conexiune
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                Live
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
