
import { useState, useEffect } from 'react';
import { Search, Shield, Globe, Server, AlertTriangle, CheckCircle, XCircle, MapPin, Clock, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
  fraudScore: number;
  isBlacklisted: boolean;
  dns: string[];
  vpnDetected: boolean;
  proxyDetected: boolean;
}

const Index = () => {
  const [currentIP, setCurrentIP] = useState<string>('');
  const [searchIP, setSearchIP] = useState<string>('');
  const [ipInfo, setIPInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [autoLoaded, setAutoLoaded] = useState<boolean>(false);

  // Simulate fetching current IP and info
  const fetchIPInfo = async (ip?: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - în realitate ar fi de la un API real
    const mockInfo: IPInfo = {
      ip: ip || '185.123.45.67',
      city: 'București',
      region: 'București',
      country: 'România',
      isp: 'RCS & RDS',
      org: 'Digi Communications',
      timezone: 'Europe/Bucharest',
      lat: 44.4268,
      lon: 26.1025,
      fraudScore: Math.floor(Math.random() * 30) + 5,
      isBlacklisted: Math.random() > 0.8,
      dns: ['8.8.8.8', '1.1.1.1'],
      vpnDetected: Math.random() > 0.7,
      proxyDetected: Math.random() > 0.8
    };
    
    setIPInfo(mockInfo);
    if (!ip) {
      setCurrentIP(mockInfo.ip);
    }
    setLoading(false);
  };

  // Auto-load current IP info on mount
  useEffect(() => {
    if (!autoLoaded) {
      fetchIPInfo();
      setAutoLoaded(true);
    }
  }, [autoLoaded]);

  const handleSearch = () => {
    if (!searchIP.trim()) {
      toast({
        title: "Eroare",
        description: "Te rog introdu un IP valid",
        variant: "destructive"
      });
      return;
    }
    
    // Basic IP validation
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(searchIP)) {
      toast({
        title: "Eroare",
        description: "Formatul IP-ului nu este valid",
        variant: "destructive"
      });
      return;
    }
    
    fetchIPInfo(searchIP);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 max-w-[2000px]">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            IP Analyzer Pro
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Verifică IP-uri pentru fraud, blacklist, ISP și multe altele
          </p>
          
          {/* Search Section */}
          <div className="flex justify-center items-center gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Introdu IP-ul pentru verificare (ex: 192.168.1.1)"
                value={searchIP}
                onChange={(e) => setSearchIP(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 h-12 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 h-12 px-8"
              disabled={loading}
            >
              {loading ? 'Analizez...' : 'Analizează'}
            </Button>
          </div>

          {currentIP && (
            <div className="text-center mb-8">
              <p className="text-gray-300">IP-ul tău curent: 
                <span className="text-cyan-400 font-mono ml-2 text-xl">{currentIP}</span>
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {ipInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Location Info */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Localizare
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">IP:</span>
                  <span className="text-cyan-400 font-mono">{ipInfo.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Țară:</span>
                  <span className="text-white">{ipInfo.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Oraș:</span>
                  <span className="text-white">{ipInfo.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Coordonate:</span>
                  <span className="text-white">{ipInfo.lat.toFixed(4)}, {ipInfo.lon.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fus orar:</span>
                  <span className="text-white">{ipInfo.timezone}</span>
                </div>
              </CardContent>
            </Card>

            {/* ISP Info */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  Furnizor Internet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">ISP:</span>
                  <span className="text-white">{ipInfo.isp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Organizație:</span>
                  <span className="text-white">{ipInfo.org}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">DNS Servers:</span>
                  <div className="text-right">
                    {ipInfo.dns.map((dns, index) => (
                      <div key={index} className="text-cyan-400 font-mono">{dns}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Analysis */}
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
                        Detectat
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
                  <span className="text-gray-300">VPN Detectat:</span>
                  <Badge variant={ipInfo.vpnDetected ? "destructive" : "secondary"} className="flex items-center gap-1">
                    {ipInfo.vpnDetected ? (
                      <>
                        <AlertTriangle className="w-3 h-3" />
                        Da
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Nu
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Proxy Detectat:</span>
                  <Badge variant={ipInfo.proxyDetected ? "destructive" : "secondary"} className="flex items-center gap-1">
                    {ipInfo.proxyDetected ? (
                      <>
                        <AlertTriangle className="w-3 h-3" />
                        Da
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Nu
                      </>
                    )}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Additional Tools */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300 lg:col-span-2 xl:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Server className="w-5 h-5 text-purple-400" />
                  Instrumente Adiționale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
                  <Globe className="w-4 h-4 mr-2" />
                  Traceroute (În dezvoltare)
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
                  <Clock className="w-4 h-4 mr-2" />
                  Ping Test (În dezvoltare)
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-700" disabled>
                  <Shield className="w-4 h-4 mr-2" />
                  Port Scanner (În dezvoltare)
                </Button>
              </CardContent>
            </Card>

            {/* Blacklist Details */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-600 hover:bg-slate-800/40 transition-all duration-300 lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Verificare Blacklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Spamhaus', 'Barracuda', 'SpamCop', 'SURBL', 'URIBL', 'Malware Domains', 'PhishTank', 'Google Safe'].map((service) => (
                    <div key={service} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-gray-300 text-sm">{service}</span>
                      <Badge variant={Math.random() > 0.8 ? "destructive" : "secondary"} className="text-xs">
                        {Math.random() > 0.8 ? (
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
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
