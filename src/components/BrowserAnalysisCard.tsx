
import { Monitor, Globe, Clock, Wifi, Shield, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPInfo } from '@/types/ip';
import { useEffect, useState } from 'react';

interface BrowserAnalysisCardProps {
  ipInfo: IPInfo;
}

export const BrowserAnalysisCard = ({ ipInfo }: BrowserAnalysisCardProps) => {
  const [browserInfo, setBrowserInfo] = useState({
    userAgent: '',
    platform: '',
    language: '',
    screen: '',
    timezone: '',
    connection: '',
    webrtc: 'Detectare...',
    timezoneOffset: 0,
    currentTime: ''
  });

  useEffect(() => {
    const updateBrowserInfo = () => {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset();
      const gmtOffset = -timezoneOffset / 60;
      const gmtString = `GMT${gmtOffset >= 0 ? '+' : ''}${gmtOffset}`;
      const timeString = now.toLocaleTimeString('ro-RO', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });

      setBrowserInfo({
        userAgent: navigator.userAgent.split(' ')[0] || 'Unknown',
        platform: navigator.platform || 'Unknown',
        language: navigator.language || 'Unknown',
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        connection: (navigator as any).connection?.effectiveType || 'Unknown',
        webrtc: 'Detectare...',
        timezoneOffset,
        currentTime: `${gmtString} ${timeString}`
      });
    };

    updateBrowserInfo();
    const interval = setInterval(updateBrowserInfo, 1000);

    // WebRTC Detection
    const detectWebRTC = async () => {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        pc.createDataChannel('');
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        pc.onicecandidate = (event) => {
          if (event.candidate && event.candidate.candidate.includes('srflx')) {
            setBrowserInfo(prev => ({ ...prev, webrtc: 'Detectat' }));
            pc.close();
          }
        };
        
        setTimeout(() => {
          setBrowserInfo(prev => ({ ...prev, webrtc: 'Nu este detectat' }));
          pc.close();
        }, 3000);
      } catch (error) {
        setBrowserInfo(prev => ({ ...prev, webrtc: 'Blocat/Indisponibil' }));
      }
    };

    detectWebRTC();

    return () => clearInterval(interval);
  }, []);

  const getTimezoneMatch = () => {
    if (!ipInfo.timezone || !browserInfo.timezone) return 'Unknown';
    return ipInfo.timezone.includes(browserInfo.timezone) || browserInfo.timezone.includes(ipInfo.timezone);
  };

  const isWebRTCRisk = browserInfo.webrtc === 'Detectat';

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-300 hover:border-purple-400/70 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-sm">
          <div className="p-1.5 bg-purple-100 rounded-lg border border-purple-200">
            <Monitor className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-sm font-bold">
            🖥️ Analiză Browser
          </span>
          <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700 border-purple-200 text-xs">
            Client
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 pt-0">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Monitor className="w-3 h-3" />
                Browser:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-right max-w-[120px] truncate">
                {browserInfo.userAgent}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Shield className="w-3 h-3" />
                Platformă:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {browserInfo.platform}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Globe className="w-3 h-3" />
                Limbă:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {browserInfo.language}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Eye className="w-3 h-3" />
                Rezoluție:
              </span>
              <span className="text-slate-800 font-mono font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {browserInfo.screen}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" />
                Fus orar:
              </span>
              <div className="text-right">
                <div className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                  {browserInfo.currentTime}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {browserInfo.timezone}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Shield className="w-3 h-3" />
                Sincron IP:
              </span>
              <Badge 
                className={`text-xs ${getTimezoneMatch() ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200 animate-pulse'}`}
              >
                {getTimezoneMatch() ? '✓ Sincronizat' : '⚠️ Diferit'}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Wifi className="w-3 h-3" />
                Conexiune:
              </span>
              <span className="text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 uppercase">
                {browserInfo.connection}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Shield className="w-3 h-3" />
                WebRTC:
              </span>
              <Badge 
                className={`text-xs ${
                  isWebRTCRisk 
                    ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' 
                    : browserInfo.webrtc === 'Detectare...' 
                      ? 'bg-blue-100 text-blue-700 border-blue-200' 
                      : 'bg-green-100 text-green-700 border-green-200'
                }`}
              >
                {isWebRTCRisk ? '⚠️ ' : browserInfo.webrtc === 'Detectare...' ? '🔄 ' : '✓ '}
                {browserInfo.webrtc}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 text-xs font-medium flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              Analiză în timp real
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
