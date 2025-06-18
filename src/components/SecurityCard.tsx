
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface SecurityCardProps {
  ipInfo: IPInfo;
}

export const SecurityCard = ({ ipInfo }: SecurityCardProps) => {
  const getFraudScoreColor = (score: number) => {
    if (score < 25) return 'text-green-300';
    if (score < 50) return 'text-yellow-300';
    if (score < 75) return 'text-orange-300';
    return 'text-red-300';
  };

  const getFraudScoreText = (score: number) => {
    if (score < 25) return 'Risc scăzut 🟢';
    if (score < 50) return 'Risc moderat 🟡';
    if (score < 75) return 'Risc ridicat 🟠';
    return 'Risc foarte ridicat 🔴';
  };

  return (
    <Card className="bg-gradient-to-br from-green-600/40 via-yellow-600/30 to-red-600/40 backdrop-blur-xl border-green-400/50 hover:border-yellow-400/70 transition-all duration-500 shadow-2xl hover:shadow-green-500/30 transform hover:-translate-y-2 animate-fade-in">
      <CardHeader className="pb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/20 animate-pulse"></div>
        <CardTitle className="flex items-center gap-2 text-white relative z-10 text-sm">
          <div className="p-1.5 bg-green-500/30 rounded-lg backdrop-blur-sm border border-green-400/50 animate-pulse">
            <Shield className="w-4 h-4 text-green-300" />
          </div>
          <span className="text-sm font-bold flex items-center gap-1">
            🛡️ Securitate
            <span className="animate-bounce">⚡</span>
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        <div className="flex justify-between items-center p-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-400/30">
          <span className="text-red-200 text-xs flex items-center gap-1">
            🎯 Fraud Score:
          </span>
          <div className="text-right">
            <div className={`text-lg font-bold ${getFraudScoreColor(ipInfo.fraudScore)} animate-pulse`}>
              {ipInfo.fraudScore}%
            </div>
            <div className={`text-xs ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {getFraudScoreText(ipInfo.fraudScore)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
          <span className="text-blue-200 text-xs flex items-center gap-1">
            📋 Blacklist:
          </span>
          <Badge variant={ipInfo.isBlacklisted ? "destructive" : "secondary"} 
                 className={`flex items-center gap-1 text-xs ${ipInfo.isBlacklisted ? 'bg-red-500/30 text-red-200 border-red-400/50 animate-pulse' : 'bg-green-500/30 text-green-200 border-green-400/50'}`}>
            {ipInfo.isBlacklisted ? (
              <>
                <XCircle className="w-3 h-3" />
                {ipInfo.blacklistCount} Listă/e 🚨
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                Clean ✅
              </>
            )}
          </Badge>
        </div>

        <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
          <span className="text-purple-200 text-xs flex items-center gap-1">
            🌐 VPN/Proxy:
          </span>
          <div className="flex gap-1">
            <Badge variant={ipInfo.vpnDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.vpnDetected ? 'bg-red-500/30 text-red-200 border-red-400/50 animate-pulse' : 'bg-green-500/30 text-green-200 border-green-400/50'}`}>
              VPN: {ipInfo.vpnDetected ? '🔴' : '🟢'}
            </Badge>
            <Badge variant={ipInfo.proxyDetected ? "destructive" : "secondary"} 
                   className={`text-xs ${ipInfo.proxyDetected ? 'bg-red-500/30 text-red-200 border-red-400/50 animate-pulse' : 'bg-green-500/30 text-green-200 border-green-400/50'}`}>
              Proxy: {ipInfo.proxyDetected ? '🔴' : '🟢'}
            </Badge>
          </div>
        </div>

        {ipInfo.riskLevel.includes('Pending') && (
          <div className="text-xs text-yellow-300 mt-1 p-1 bg-yellow-500/20 rounded border border-yellow-400/30 animate-pulse">
            ⚠️ Scamalytics API în curs de aprobare
          </div>
        )}
      </CardContent>
    </Card>
  );
};
