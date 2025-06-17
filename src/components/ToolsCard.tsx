
import { Server, Globe, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ToolsCard = () => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300 lg:col-span-2 xl:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Server className="w-5 h-5 text-purple-400" />
          Instrumente Adiționale
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
      </CardContent>
    </Card>
  );
};
