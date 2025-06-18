
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
      <Card className="bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-pink-600/40 backdrop-blur-xl border-blue-400/50 hover:border-purple-400/70 transition-all duration-500 shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2 animate-fade-in">
        <CardHeader className="pb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
          <CardTitle className="flex items-center gap-2 text-white relative z-10 text-sm">
            <div className="p-1.5 bg-blue-500/30 rounded-lg backdrop-blur-sm border border-blue-400/50 animate-pulse">
              <Wifi className="w-4 h-4 text-blue-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold flex items-center gap-1">
                🌐 Furnizor Internet
                <span className="animate-bounce">🔥</span>
              </span>
            </div>
            <Badge variant="secondary" className="ml-auto bg-blue-500/30 text-blue-200 border-blue-400/50 text-xs animate-pulse">
              ISP 💎
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2 pt-0">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-blue-200 flex items-center gap-1">
                  <Building className="w-3 h-3 text-blue-300" />
                  ISP:
                </span>
                <span className="text-white font-medium bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                  {ipInfo.isp} ⚡
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-indigo-200 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-indigo-300" />
                  Org:
                </span>
                <span className="text-white font-medium bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-400/30">
                  {ipInfo.org} 🌟
                </span>
              </div>
              
              {ipInfo.asn && (
                <div className="flex justify-between items-center">
                  <span className="text-purple-200 flex items-center gap-1">
                    <Hash className="w-3 h-3 text-purple-300" />
                    ASN:
                  </span>
                  <span className="text-white font-mono text-xs bg-purple-500/20 px-2 py-0.5 rounded border border-purple-400/30">
                    {ipInfo.asn} 🎯
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-2 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-lg border border-emerald-400/50 animate-pulse">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200 text-xs font-medium flex items-center gap-1">
                🟢 Status
              </span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                <Badge variant="secondary" className="bg-emerald-500/30 text-emerald-200 border-emerald-400/50 text-xs">
                  Live 🚀
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
