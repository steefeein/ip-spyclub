
import { MapPin, Globe, Navigation, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IPInfo } from '@/types/ip';

interface LocationCardProps {
  ipInfo: IPInfo;
}

export const LocationCard = ({ ipInfo }: LocationCardProps) => {
  return (
    <TooltipProvider>
      <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 backdrop-blur-xl border-slate-500/20 hover:border-cyan-400/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-1">
        <CardHeader className="pb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-50"></div>
          <CardTitle className="flex items-center gap-3 text-white relative z-10">
            <div className="p-2 bg-cyan-500/20 rounded-lg backdrop-blur-sm border border-cyan-400/30">
              <MapPin className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">Localizare Geografică</span>
              <span className="text-xs text-cyan-300 font-normal">Date complete de geoloc</span>
            </div>
            <Badge variant="secondary" className="ml-auto bg-cyan-500/20 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/30 transition-colors">
              LIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* IP Address with enhanced styling */}
          <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-300">
            <span className="text-gray-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Adresa IP:
            </span>
            <HoverCard>
              <HoverCardTrigger>
                <span className="text-cyan-400 font-mono text-lg cursor-pointer hover:text-cyan-300 transition-colors">
                  {ipInfo.ip}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-slate-800/95 border-slate-600/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">Detalii IP</h4>
                  <p className="text-xs text-gray-300">
                    Aceasta este adresa IP publică care identifică conexiunea dvs. la internet.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* GeoIP1 Section */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-semibold text-sm">Sursa Primară (GeoIP1)</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-blue-400 opacity-70 hover:opacity-100 transition-opacity" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Date primare de geolocalizare</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Țară:</span>
                <span className="text-white font-medium">{ipInfo.country}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Regiune:</span>
                <span className="text-white font-medium">{ipInfo.region}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Oraș:</span>
                <span className="text-white font-medium">{ipInfo.city}</span>
              </div>
            </div>
          </div>

          {/* GeoIP2 Section */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl border border-green-400/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-semibold text-sm">Sursa Secundară (GeoIP2)</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-green-400 opacity-70 hover:opacity-100 transition-opacity" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Date secundare pentru verificare</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Țară:</span>
                <span className="text-white font-medium">{ipInfo.countrySecondary || ipInfo.country}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Regiune:</span>
                <span className="text-white font-medium">{ipInfo.regionSecondary || ipInfo.region}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Oraș:</span>
                <span className="text-white font-medium">{ipInfo.citySecondary || ipInfo.city}</span>
              </div>
            </div>
          </div>

          {/* Coordinates and Timezone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/30 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Coordonate</span>
              </div>
              <div className="text-white font-mono text-xs">
                <div>Lat: {ipInfo.lat.toFixed(6)}</div>
                <div>Lon: {ipInfo.lon.toFixed(6)}</div>
              </div>
            </div>
            
            <div className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/30 hover:border-orange-400/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">Fus Orar</span>
              </div>
              <div className="text-white font-medium text-xs">
                {ipInfo.timezone}
              </div>
            </div>
          </div>

          {/* Enhanced status indicator */}
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg border border-emerald-400/30">
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 text-sm font-medium">Status conexiune</span>
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
