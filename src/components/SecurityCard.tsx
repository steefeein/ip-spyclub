
import { Shield, CheckCircle, XCircle, Server, Cloud, AlertTriangle } from 'lucide-react';
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

  const getFraudScoreBg = (score: number) => {
    if (score < 25) return 'bg-emerald-50 border-emerald-200';
    if (score < 50) return 'bg-amber-50 border-amber-200';
    if (score < 75) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const isApiError = ipInfo.riskLevel.includes('Eroare API');

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
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 border-green-200 text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        {/* Main Fraud Score */}
        <div className={`flex justify-between items-center p-2 rounded-lg border ${getFraudScoreBg(ipInfo.fraudScore)}`}>
          <span className="text-slate-600 text-xs font-medium">
            Fraud Score:
          </span>
          <div className="text-right">
            <div className={`text-lg font-bold ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {ipInfo.fraudScore}%
            </div>
            <div className={`text-xs ${getFraudScoreColor(ipInfo.fraudScore)}`}>
              {ipInfo.riskLevel}
            </div>
          </div>
        </div>

        {/* ISP Score */}
        {ipInfo.ispScore !== undefined && (
          <div className={`flex justify-between items-center p-2 rounded-lg border ${getFraudScoreBg(ipInfo.ispScore)}`}>
            <span className="text-slate-600 text-xs font-medium">
              ISP Score:
            </span>
            <div className="text-right">
              <div className={`text-sm font-bold ${getFraudScoreColor(ipInfo.ispScore)}`}>
                {ipInfo.ispScore}%
              </div>
              <div className={`text-xs ${getFraudScoreColor(ipInfo.ispScore)}`}>
                {ipInfo.ispRisk}
              </div>
            </div>
          </div>
        )}
        
        {/* Blacklist Information */}
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-600 text-xs font-medium">
            Blacklist:
          </span>
          <div className="text-right">
            <Badge variant={ipInfo.isBlacklisted ? "destructive" : "secondary"} 
                   className={`flex items-center gap-1 text-xs mb-1 ${ipInfo.isBlacklisted ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
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
            {ipInfo.blacklistSources && ipInfo.blacklistSources.length > 0 && (
              <div className="text-xs text-red-600">
                {ipInfo.blacklistSources.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* VPN/Proxy Detection */}
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-600 text-xs font-medium">
            VPN/Proxy:
          </span>
          <div className="flex flex-col gap-1">
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
            {ipInfo.proxyType && ipInfo.proxyType !== 'Unknown' && (
              <div className="text-xs text-slate-600">
                Tip: {ipInfo.proxyType}
              </div>
            )}
          </div>
        </div>

        {/* Infrastructure Detection */}
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-600 text-xs font-medium flex items-center gap-1">
            <Server className="w-3 h-3" />
            Infrastructură:
          </span>
          <div className="flex flex-wrap gap-1 justify-end">
            {ipInfo.isDatacenter && (
              <Badge variant="destructive" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                Datacenter
              </Badge>
            )}
            {ipInfo.isAmazonAws && (
              <Badge variant="destructive" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                AWS
              </Badge>
            )}
            {ipInfo.isGoogle && (
              <Badge variant="destructive" className="text-xs bg-green-100 text-green-700 border-green-200">
                Google
              </Badge>
            )}
            {ipInfo.isAppleRelay && (
              <Badge variant="destructive" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                Apple Relay
              </Badge>
            )}
            {!ipInfo.isDatacenter && !ipInfo.isAmazonAws && !ipInfo.isGoogle && !ipInfo.isAppleRelay && (
              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                Residential
              </Badge>
            )}
          </div>
        </div>

        {isApiError && (
          <div className="text-xs text-red-700 mt-1 p-2 bg-red-50 rounded border border-red-200 animate-pulse flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            ⚠️ Eroare la conectarea cu Scamalytics API
          </div>
        )}
      </CardContent>
    </Card>
  );
};
