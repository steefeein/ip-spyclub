
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface SecurityCardProps {
  ipInfo: IPInfo;
}

export const SecurityCard = ({ ipInfo }: SecurityCardProps) => {
  const getFraudScoreColor = (score: number) => {
    if (score < 25) return 'text-emerald-200';
    if (score < 50) return 'text-amber-200';
    if (score < 75) return 'text-orange-200';
    return 'text-red-200';
  };

  const getFraudScoreText = (score: number) => {
    if (score < 25) return 'Risc scăzut';
    if (score < 50) return 'Risc moderat';
    if (score < 75) return 'Risc ridicat';
    return 'Risc foarte ridicat';
  };

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-600/50 hover:border-red-400/50 transition-all duration-500 shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 animate-fade-in">
      <CardHeader className="pb-2 relative overflow-hidden">
        <CardTitle className="flex items-center gap-2 text-white relative z-10 text-sm">
          <div className="p-1.5 bg-red-600/40 rounded-lg backdrop-blur-sm border border-red-500/50">
            <Shield className="w-4 h-4 text-red-200" />
          </div>
          <span className="text-sm font-bold flex items-center gap-1">
            🛡️ Securitate
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        <div className="flex justify-between items-center p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <span className="text-slate-300 text-xs flex items-center gap-1">
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
        
        <div className="flex justify-between items-center p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <span className="text-slate-300 text-xs flex items-center gap-1">
            Blacklist:
          </span>
          <Badge variant={ipInfo.isBlacklisted ? "destructive" : "secondary"} 
                 className={`flex items-center gap-1 text-xs ${ipInfo.isBlacklisted ? 'bg-red-600/40 text-red-100 border-red-500/50' : 'bg-emerald-600/40 text-emerald-100 border-emerald-500/50'}`}>
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

        <div className="flex justify-between items-center p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <span className="text-slate-300 text-xs flex items-center gap-1">
            VPN/Proxy:
          </span>
          <div className="flex gap-1">
            <Badge variant={ipInfo.vpnDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.vpnDetected ? 'bg-red-600/40 text-red-100 border-red-500/50' : 'bg-emerald-600/40 text-emerald-100 border-emerald-500/50'}`}>
              VPN: {ipInfo.vpnDetected ? 'Da' : 'Nu'}
            </Badge>
            <Badge variant={ipInfo.proxyDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.proxyDetected ? 'bg-red-600/40 text-red-100 border-red-500/50' : 'bg-emerald-600/40 text-emerald-100 border-emerald-500/50'}`}>
              Proxy: {ipInfo.proxyDetected ? 'Da' : 'Nu'}
            </Badge>
          </div>
        </div>

        {ipInfo.riskLevel.includes('Pending') && (
          <div className="text-xs text-amber-200 mt-1 p-1 bg-amber-600/20 rounded border border-amber-500/40">
            ⚠️ Scamalytics API în curs de aprobare
          </div>
        )}
      </CardContent>
    </Card>
  );
};
