
import { Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface ISPCardProps {
  ipInfo: IPInfo;
}

export const ISPCard = ({ ipInfo }: ISPCardProps) => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Wifi className="w-5 h-5 text-blue-400" />
          <span>Furnizor Internet</span>
          <Badge variant="secondary" className="text-xs ml-2">
            GEO
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-300">ISP:</span>
          <span className="text-white">{ipInfo.isp}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Organizație:</span>
          <span className="text-white">{ipInfo.org}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Status:</span>
          <Badge variant="secondary" className="text-xs">
            Live via IP-Score.com
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
