
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface LocationCardProps {
  ipInfo: IPInfo;
}

export const LocationCard = ({ ipInfo }: LocationCardProps) => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <span>Localizare</span>
          <Badge variant="secondary" className="text-xs ml-2">
            GEO
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-300">IP:</span>
          <span className="text-cyan-400 font-mono">{ipInfo.ip}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Țară:</span>
          <span className="text-white">{ipInfo.country}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Regiune:</span>
          <span className="text-white">{ipInfo.region}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Oraș:</span>
          <span className="text-white">{ipInfo.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Coordonate:</span>
          <span className="text-white">{ipInfo.lat.toFixed(4)}, {ipInfo.lon.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Fus orar:</span>
          <span className="text-white">{ipInfo.timezone}</span>
        </div>
      </CardContent>
    </Card>
  );
};
