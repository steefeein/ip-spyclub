
import { Globe, Clock, Monitor, Smartphone, Info, MapPin, Languages, Wifi, Radio, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';

interface BrowserAnalysisCardProps {
  ipInfo: IPInfo;
}

export const BrowserAnalysisCard = ({ ipInfo }: BrowserAnalysisCardProps) => {
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const languages = navigator.languages?.join(', ') || language;
    const cookieEnabled = navigator.cookieEnabled;
    const onLine = navigator.onLine;
    const connection = (navigator as any).connection;
    
    // Get screen info
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const colorDepth = screen.colorDepth;
    const pixelDepth = screen.pixelDepth;
    
    // Get timezone info
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const clientTime = new Date();
    const clientTimeString = clientTime.toLocaleString('ro-RO');
    const timezoneOffset = clientTime.getTimezoneOffset();
    const gmtOffset = `GMT${timezoneOffset <= 0 ? '+' : '-'}${Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0')}:${(Math.abs(timezoneOffset) % 60).toString().padStart(2, '0')}`;
    const currentTimeHHMM = clientTime.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
    
    // Compare with IP timezone
    const ipTimezone = ipInfo.timezone;
    const timezoneMatch = clientTimezone === ipTimezone;
    
    // WebRTC Detection
    const webRTCSupported = !!(window.RTCPeerConnection || (window as any).webkitRTCPeerConnection || (window as any).mozRTCPeerConnection);
    
    return {
      userAgent,
      platform,
      language,
      languages,
      cookieEnabled,
      onLine,
      connection: connection ? {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      } : null,
      screen: {
        width: screenWidth,
        height: screenHeight,
        colorDepth,
        pixelDepth
      },
      timezone: {
        client: clientTimezone,
        ip: ipTimezone,
        match: timezoneMatch,
        clientTime: clientTimeString,
        offset: timezoneOffset,
        gmtOffset,
        currentTime: currentTimeHHMM
      },
      webRTC: {
        supported: webRTCSupported,
        localIPs: [] // Will be populated by WebRTC detection
      }
    };
  };

  const browserInfo = getBrowserInfo();

  const getDeviceType = () => {
    if (/Mobile|Android|iPhone|iPad/.test(browserInfo.userAgent)) {
      return { type: 'Mobile', icon: Smartphone, color: 'text-blue-400' };
    }
    return { type: 'Desktop', icon: Monitor, color: 'text-green-400' };
  };

  const deviceInfo = getDeviceType();

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-600/50 hover:border-blue-400/50 transition-all duration-500 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <div className="p-1.5 bg-blue-600/40 rounded-lg backdrop-blur-sm border border-blue-500/50">
            <Globe className="w-4 h-4 text-blue-200" />
          </div>
          <span className="font-bold">🖥️ Analiză Browser</span>
          <Badge variant="secondary" className="ml-auto bg-blue-600/30 text-blue-100 border-blue-500/50 text-xs">
            Client
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        {/* Device & Platform */}
        <div className="p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <deviceInfo.icon className={`w-3 h-3 ${deviceInfo.color}`} />
                Dispozitiv:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {deviceInfo.type}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Monitor className="w-3 h-3 text-slate-400" />
                Platformă:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.platform}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Rezoluție:
              </span>
              <span className="text-white font-mono text-xs bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.screen.width}x{browserInfo.screen.height}
              </span>
            </div>
          </div>
        </div>

        {/* Timezone Analysis */}
        <div className={`p-2 rounded-lg border ${
          browserInfo.timezone.match 
            ? 'bg-green-600/20 border-green-500/40' 
            : 'bg-yellow-600/20 border-yellow-500/40 animate-pulse'
        }`}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Fus Client:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.timezone.client}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Fus IP:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.timezone.ip}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300">GMT & Timp:</span>
              <span className="text-white font-mono text-xs bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.timezone.gmtOffset} | {browserInfo.timezone.currentTime}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Concordanță:</span>
              <Badge 
                variant={browserInfo.timezone.match ? "secondary" : "destructive"}
                className={`text-xs ${
                  browserInfo.timezone.match 
                    ? 'bg-green-600/30 text-green-100 border-green-500/50' 
                    : 'bg-yellow-600/30 text-yellow-100 border-yellow-500/50 animate-pulse'
                }`}
              >
                {browserInfo.timezone.match ? '✅ Concordă' : '⚠️ Diferă'}
              </Badge>
            </div>
          </div>
        </div>

        {/* WebRTC Detection */}
        <div className="p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Radio className="w-3 h-3 text-slate-400" />
                WebRTC:
              </span>
              <Badge 
                variant={browserInfo.webRTC.supported ? "secondary" : "destructive"}
                className={`text-xs ${
                  browserInfo.webRTC.supported 
                    ? 'bg-green-600/30 text-green-100 border-green-500/50' 
                    : 'bg-red-600/30 text-red-100 border-red-500/50'
                }`}
              >
                {browserInfo.webRTC.supported ? '🟢 Suportat' : '🔴 Nu'}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-slate-400" />
                Status WebRTC:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.webRTC.supported ? 'Activ' : 'Inactiv'}
              </span>
            </div>
          </div>
        </div>

        {/* Language & Connection */}
        <div className="p-2 bg-slate-700/40 rounded-lg border border-slate-600/40">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1">
                <Languages className="w-3 h-3 text-slate-400" />
                Limbă:
              </span>
              <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                {browserInfo.language}
              </span>
            </div>
            
            {browserInfo.connection && (
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-slate-400" />
                  Conexiune:
                </span>
                <span className="text-white font-medium bg-slate-600/30 px-2 py-0.5 rounded">
                  {browserInfo.connection.effectiveType}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Online:</span>
              <Badge 
                variant={browserInfo.onLine ? "secondary" : "destructive"}
                className={`text-xs ${
                  browserInfo.onLine 
                    ? 'bg-green-600/30 text-green-100 border-green-500/50' 
                    : '&red-600/30 text-red-100 border-red-500/50'
                }`}
              >
                {browserInfo.onLine ? '🟢 Da' : '🔴 Nu'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
