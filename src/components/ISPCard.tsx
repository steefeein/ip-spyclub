
import { Wifi, Building, Hash, Globe, MapPin, Clock, Server, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IPInfo } from '@/types/ip';

interface ISPCardProps {
  ipInfo: IPInfo;
}

export const ISPCard = ({ ipInfo }: ISPCardProps) => {
  return (
    <TooltipProvider>
      <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-600/50 hover:border-blue-400/50 transition-all duration-500 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 animate-fade-in">
        <CardHeader className="pb-2 relative overflow-hidden">
          <CardTitle className="flex items-center gap-2 text-white relative z-10 text-sm">
            <div className="p-1.5 bg-blue-600/40 rounded-lg backdrop-blur-sm border border-blue-500/50">
              <Wifi className="w-4 h-4 text-blue-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold flex items-center gap-1">
                🌐 Furnizor Internet
              </span>
            </div>
            <Badge variant="secondary" className="ml-auto bg-blue-600/30 text-blue-100 border-blue-500/50 text-xs">
              ISP
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2 pt-0">
          <div className="p-2 bg-slate-700/40 rounded-lg border border-slate-600/40 backdrop-blur-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  ISP:
                </span>
                <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded border border-slate-500/40">
                  {ipInfo.isp}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  Organizație:
                </span>
                <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded border border-slate-500/40">
                  {ipInfo.org}
                </span>
              </div>
              
              {ipInfo.asn && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Hash className="w-3 h-3 text-slate-400" />
                    ASN:
                  </span>
                  <span className="text-white font-mono text-xs bg-slate-600/30 px-2 py-0.5 rounded border border-slate-500/40">
                    {ipInfo.asn}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  Locație:
                </span>
                <span className="text-white text-xs bg-slate-600/30 px-2 py-0.5 rounded border border-slate-500/40">
                  {ipInfo.city}, {ipInfo.country}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Fus orar:
                </span>
                <span className="text-white text-xs bg-slate-600/30 px-2 py-0.5 rounded border border-slate-500/40">
                  {ipInfo.timezone}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <Server className="w-3 h-3 text-slate-400" />
                  Tip serviciu:
                </span>
                <div className="flex gap-1">
                  {ipInfo.mobile && (
                    <Badge className="bg-blue-600/30 text-blue-100 border-blue-500/50 text-xs">📱 Mobile</Badge>
                  )}
                  {ipInfo.proxy && (
                    <Badge className="bg-yellow-600/30 text-yellow-100 border-yellow-500/50 text-xs animate-pulse">🔒 Proxy</Badge>
                  )}
                  {ipInfo.hosting && (
                    <Badge className="bg-purple-600/30 text-purple-100 border-purple-500/50 text-xs">🖥️ Hosting</Badge>
                  )}
                  {!ipInfo.mobile && !ipInfo.proxy && !ipInfo.hosting && (
                    <Badge className="bg-green-600/30 text-green-100 border-green-500/50 text-xs">🏠 Rezidențial</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-emerald-600/20 rounded-lg border border-emerald-500/40">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200 text-xs font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Status conexiune
              </span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                <Badge variant="secondary" className="bg-emerald-600/30 text-emerald-100 border-emerald-500/50 text-xs">
                  Live
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
