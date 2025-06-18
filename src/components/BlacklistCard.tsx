
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface BlacklistCardProps {
  ipInfo: IPInfo;
}

export const BlacklistCard = ({ ipInfo }: BlacklistCardProps) => {
  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-600/50 hover:border-yellow-400/50 transition-all duration-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <div className="p-1.5 bg-yellow-600/40 rounded-lg backdrop-blur-sm border border-yellow-500/50">
            <AlertTriangle className="w-4 h-4 text-yellow-200" />
          </div>
          <span className="font-bold">🛡️ Blacklist</span>
          <Badge variant="secondary" className="ml-auto bg-yellow-600/30 text-yellow-100 border-yellow-500/50 text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {Object.entries(ipInfo.blacklists).map(([service, isListed]) => (
            <div key={service} className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">{service}</span>
              <Badge 
                variant={isListed ? "destructive" : "secondary"} 
                className={`text-xs ${
                  isListed 
                    ? 'bg-red-600/30 text-red-100 border-red-500/50 animate-pulse' 
                    : 'bg-green-600/30 text-green-100 border-green-500/50'
                }`}
              >
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
            <div className="text-center text-slate-400 py-3 text-xs">
              Nu sunt disponibile date
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
