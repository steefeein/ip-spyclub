
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface SecurityCardProps {
  ipInfo: IPInfo;
}

export const SecurityCard = ({ ipInfo }: SecurityCardProps) => {
  const getFraudScoreColor = (score: number) => {
    if (score < 25) return 'text-emerald-700';
    if (score < 50) return 'text-amber-700';
    if (score < 75) return 'text-orange-700';
    return 'text-red-700';
  };

  const getFraudScoreText = (score: number) => {
    if (score < 25) return 'Risc scăzut';
    if (score < 50) return 'Risc moderat';
    if (score < 75) return 'Risc ridicat';
    return 'Risc foarte ridicat';
  };

  const getFraudScoreBg = (score: number) => {
    if (score < 25) return 'bg-emerald-50 border-emerald-200';
    if (score < 50) return 'bg-amber-50 border-amber-200';
    if (score < 75) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-300 hover:border-red-400/70 transition-all duration-300 shadow-lg hover:shadow-red-500/10 transform hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-sm">
          <div className="p-1.5 bg-red-100 rounded-lg border border-red-200">
            <Shield className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-sm font-bold">
            🛡️ Securitate
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        <div className={`flex justify-between items-center p-2 rounded-lg border ${getFraudScoreBg(ipInfo.fraudScore)}`}>
          <span className="text-slate-600 text-xs font-medium">
            Fraud Score:
          </span>
          <div className="text-right">
            <div className={`text-lg font-bold ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {ipInfo.fraudScore}%
            </div>
            <div className={`text-xs ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {getFraudScoreText(ipInfo.fraudScore)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-600 text-xs font-medium">
            Blacklist:
          </span>
          <Badge variant={ipInfo.isBlacklisted ? "destructive" : "secondary"} 
                 className={`flex items-center gap-1 text-xs ${ipInfo.isBlacklisted ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
            {ipInfo.isBlacklisted ? (
              <>
                <XCircle className="w-3 h-3" />
                {ipInfo.blacklistCount} Listă/e
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                Clean
              </>
            )}
          </Badge>
        </div>

        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-600 text-xs font-medium">
            VPN/Proxy:
          </span>
          <div className="flex gap-1">
            <Badge variant={ipInfo.vpnDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.vpnDetected ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
              VPN: {ipInfo.vpnDetected ? 'Da' : 'Nu'}
            </Badge>
            <Badge variant={ipInfo.proxyDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.proxyDetected ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
              Proxy: {ipInfo.proxyDetected ? 'Da' : 'Nu'}
            </Badge>
          </div>
        </div>

        {ipInfo.riskLevel.includes('Pending') && (
          <div className="text-xs text-amber-700 mt-1 p-2 bg-amber-50 rounded border border-amber-200 animate-pulse">
            ⚠️ Scamalytics API în curs de aprobare
          </div>
        )}
      </CardContent>
    </Card>
  );
};
