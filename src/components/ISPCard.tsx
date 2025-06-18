
import { Wifi, Building, Hash, Globe } from 'lucide-react';
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
      <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 backdrop-blur-xl border-slate-500/20 hover:border-blue-400/30 transition-all duration-500 shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1">
        <CardHeader className="pb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50"></div>
          <CardTitle className="flex items-center gap-3 text-white relative z-10">
            <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/30">
              <Wifi className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">Furnizor Internet</span>
              <span className="text-xs text-blue-300 font-normal">Detalii complete ISP</span>
            </div>
            <Badge variant="secondary" className="ml-auto bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-colors">
              GEO
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* ISP Information */}
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-400/20 backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-400" />
                  Furnizor (ISP):
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-white font-medium cursor-pointer hover:text-blue-300 transition-colors">
                      {ipInfo.isp}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Internet Service Provider</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  Organizație:
                </span>
                <span className="text-white font-medium">{ipInfo.org}</span>
              </div>
              
              {ipInfo.asn && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-400" />
                    ASN:
                  </span>
                  <span className="text-white font-mono text-sm">{ipInfo.asn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          {(ipInfo.zip || ipInfo.userAgent) && (
            <div className="space-y-3">
              {ipInfo.zip && (
                <div className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/30 hover:border-green-400/40 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Cod Poștal:</span>
                    <span className="text-white font-medium">{ipInfo.zip}</span>
                  </div>
                </div>
              )}
              
              {ipInfo.userAgent && (
                <div className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/30 hover:border-orange-400/40 transition-all duration-300">
                  <div className="space-y-2">
                    <span className="text-gray-300 text-sm">User Agent:</span>
                    <div className="text-white text-xs font-mono bg-slate-800/50 p-2 rounded border break-all">
                      {ipInfo.userAgent}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced status indicator */}
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg border border-emerald-400/30">
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 text-sm font-medium">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-xs">
                  Live via IP-Score.com
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
