
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface SecurityCardProps {
  ipInfo: IPInfo;
}

export const SecurityCard = ({ ipInfo }: SecurityCardProps) => {
  const getFraudScoreColor = (score: number) => {
    if (score < 25) return 'text-green-400';
    if (score < 50) return 'text-yellow-400';
    if (score < 75) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFraudScoreText = (score: number) => {
    if (score < 25) return 'Risc scăzut';
    if (score < 50) return 'Risc moderat';
    if (score < 75) return 'Risc ridicat';
    return 'Risc foarte ridicat';
  };

  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-green-400" />
          Analiză Securitate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Fraud Score:</span>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {ipInfo.fraudScore}%
            </div>
            <div className={`text-xs ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {getFraudScoreText(ipInfo.fraudScore)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Blacklist:</span>
          <Badge variant={ipInfo.isBlacklisted ? "destructive" : "secondary"} className="flex items-center gap-1">
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

        <div className="flex justify-between items-center">
          <span className="text-gray-300">VPN/Proxy:</span>
          <div className="flex gap-2">
            <Badge variant={ipInfo.vpnDetected ? "destructive" : "secondary"} className="text-xs">
              VPN: {ipInfo.vpnDetected ? 'Da' : 'Nu'}
            </Badge>
            <Badge variant={ipInfo.proxyDetected ? "destructive" : "secondary"} className="text-xs">
              Proxy: {ipInfo.proxyDetected ? 'Da' : 'Nu'}
            </Badge>
          </div>
        </div>

        {ipInfo.riskLevel.includes('Pending') && (
          <div className="text-xs text-yellow-400 mt-2">
            * Scamalytics API în curs de aprobare
          </div>
        )}
      </CardContent>
    </Card>
  );
};
