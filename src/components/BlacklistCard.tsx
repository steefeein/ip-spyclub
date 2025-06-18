
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface BlacklistCardProps {
  ipInfo: IPInfo;
}

export const BlacklistCard = ({ ipInfo }: BlacklistCardProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-300 hover:border-yellow-400/70 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 transform hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-sm">
          <div className="p-1.5 bg-yellow-100 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </div>
          <span className="font-bold">🛡️ Blacklist</span>
          <Badge variant="secondary" className="ml-auto bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {Object.entries(ipInfo.blacklists).map(([service, isListed]) => (
            <div key={service} className="flex items-center justify-between text-xs bg-slate-50 p-1.5 rounded border border-slate-200">
              <span className="text-slate-600 font-medium truncate max-w-[80px]">{service}</span>
              <Badge 
                variant={isListed ? "destructive" : "secondary"} 
                className={`text-xs min-w-[60px] justify-center ${
                  isListed 
                    ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' 
                    : 'bg-green-100 text-green-700 border-green-200'
                }`}
              >
                {isListed ? (
                  <>
                    <XCircle className="w-2.5 h-2.5 mr-1" />
                    Listed
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-2.5 h-2.5 mr-1" />
                    Clean
                  </>
                )}
              </Badge>
            </div>
          ))}
          {Object.keys(ipInfo.blacklists).length === 0 && (
            <div className="text-center text-slate-500 py-3 text-xs bg-slate-50 rounded border border-slate-200">
              Nu sunt disponibile date
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
