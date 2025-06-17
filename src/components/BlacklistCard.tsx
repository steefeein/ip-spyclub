
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface BlacklistCardProps {
  ipInfo: IPInfo;
}

export const BlacklistCard = ({ ipInfo }: BlacklistCardProps) => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300 lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Verificare Blacklist (Live via IP-Score.com)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(ipInfo.blacklists).map(([service, isListed]) => (
            <div key={service} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-gray-300 text-sm">{service}</span>
              <Badge variant={isListed ? "destructive" : "secondary"} className="text-xs">
                {isListed ? (
                  <>
                    <XCircle className="w-3 h-3 mr-1" />
                    Listed
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Clean
                  </>
                )}
              </Badge>
            </div>
          ))}
          {Object.keys(ipInfo.blacklists).length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-4">
              Nu sunt disponibile date despre blacklist pentru acest IP
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
