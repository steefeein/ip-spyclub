
import { Shield, AlertTriangle, CheckCircle, Server, MapPin, Network, Clock, Globe, Activity, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDNSLeakTest } from '@/hooks/useDNSLeakTest';
import { IPInfo } from '@/types/ip';

interface DNSLeakCardProps {
  ipInfo: IPInfo;
}

export const DNSLeakCard = ({ ipInfo }: DNSLeakCardProps) => {
  const { testResult, isLoading, currentServers, runTest } = useDNSLeakTest();

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-600/30 text-green-100 border-green-500/50';
      case 'medium': return 'bg-yellow-600/30 text-yellow-100 border-yellow-500/50';
      case 'low': return 'bg-red-600/30 text-red-100 border-red-500/50';
      default: return 'bg-slate-600/30 text-slate-100 border-slate-500/50';
    }
  };

  const getServerTypeIcon = (server: any) => {
    if (server.country === 'Local Network') return '🏠';
    if (['Google LLC', 'Cloudflare', 'Quad9', 'OpenDNS'].includes(server.isp)) return '🌐';
    if (server.country === ipInfo.country) return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    return '🌍';
  };

  const getServerTypeLabel = (server: any) => {
    if (server.country === 'Local Network') return 'DNS Local';
    if (['Google LLC', 'Cloudflare', 'Quad9', 'OpenDNS'].includes(server.isp)) return 'DNS Public';
    if (server.country === ipInfo.country) return 'DNS ISP';
    return 'DNS Internațional';
  };

  const getAllServers = () => {
    if (!testResult) return currentServers;
    
    const allServers = [...testResult.servers];
    
    // Add servers from additional sources
    if (testResult.additionalSources) {
      Object.values(testResult.additionalSources).forEach((sourceServers: any[]) => {
        sourceServers.forEach(server => {
          if (!allServers.find(s => s.ip === server.ip)) {
            allServers.push(server);
          }
        });
      });
    }
    
    return allServers;
  };

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-600/50 hover:border-blue-400/50 transition-all duration-500 shadow-lg col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 bg-blue-600/40 rounded-lg backdrop-blur-sm border border-blue-500/50">
              <Wifi className="w-6 h-6 text-blue-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">🔍 DNS Leak Test Avansat - Detectare Reală 🛡️</span>
              <span className="text-sm text-blue-200 font-normal">⚡ Analiză avansată pentru detectarea serverelor DNS reale folosite de browser 🌐</span>
            </div>
          </CardTitle>
          <div className="flex items-center gap-4">
            {(testResult || currentServers.length > 0) && (
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-100">🔥 Servere: {getAllServers().length}</span>
                </div>
                {testResult && (
                  <>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-300" />
                      <span className="text-green-100">🌍 Țări: {testResult.testDetails.uniqueCountries}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-300" />
                      <span className="text-yellow-100">⚡ Timp: {testResult.testDetails.averageResponseTime}ms</span>
                    </div>
                  </>
                )}
              </div>
            )}
            <Button 
              onClick={runTest} 
              disabled={isLoading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
            >
              {isLoading ? '🔄 Detectare DNS Reală... ⚡' : '🚀 Test DNS Avansat 🔍'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Live servers display during test */}
        {isLoading && currentServers.length > 0 && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-200 font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              🔍 Servere DNS Detectate în Timp Real
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {currentServers.map((server, index) => (
                <div key={`live-${server.ip}-${index}`} className="bg-slate-700/50 rounded p-2 border border-slate-600/30">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xl">{getServerTypeIcon(server)}</span>
                    <div>
                      <div className="text-white font-mono">{server.ip}</div>
                      <div className="text-slate-300 text-xs">{server.isp} - {server.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {testResult ? (
          <>
            {/* Status Overview */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/40">
                <div className="flex items-center gap-2 mb-2">
                  {testResult.leakDetected ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  <span className="text-white font-semibold">
                    {testResult.leakDetected ? '🚨 DNS Leak Detectat' : '✅ DNS Securizat'}
                  </span>
                </div>
                <Badge 
                  variant={testResult.leakDetected ? "destructive" : "secondary"} 
                  className={`${testResult.leakDetected ? "bg-red-600/40 text-red-100 border-red-400/50 animate-pulse" : "bg-green-600/40 text-green-100 border-green-400/50"}`}
                >
                  {testResult.leakDetected ? '🔴 RISC DETECTAT' : '🟢 SECURIZAT'}
                </Badge>
                <p className="text-xs text-slate-300 mt-2">{testResult.message}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/40">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">🌍 Locația Ta</span>
                </div>
                <div className="text-sm text-slate-200 space-y-1">
                  <div>🏴󠁧󠁢󠁥󠁮󠁧󠁿 {ipInfo.country}</div>
                  <div>🗺️ {ipInfo.region}</div>
                  <div>🏙️ {ipInfo.city}</div>
                  <div className="text-xs text-slate-300">🌐 {ipInfo.isp}</div>
                </div>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/40">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">📊 Statistici Test</span>
                </div>
                <div className="text-sm text-slate-200 space-y-1">
                  <div>🔧 Servere DNS: {testResult.testDetails.totalServers}</div>
                  <div>🌍 Țări unice: {testResult.testDetails.uniqueCountries}</div>
                  <div>🏢 ISP-uri: {testResult.testDetails.uniqueISPs}</div>
                  <div>⏱️ Durata: {Math.round(testResult.testDetails.testDuration/1000)}s</div>
                </div>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/40">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">⚡ Performance</span>
                </div>
                <div className="text-sm text-slate-200 space-y-1">
                  <div>📈 Timp mediu: {testResult.testDetails.averageResponseTime}ms</div>
                  <div>🚀 Cel mai rapid: {Math.min(...getAllServers().map(s => s.responseTime || 999))}ms</div>
                  <div>🐌 Cel mai lent: {Math.max(...getAllServers().map(s => s.responseTime || 0))}ms</div>
                  <div className="text-xs text-slate-300">
                    🕒 {new Date(testResult.testDetails.timestamp).toLocaleString('ro-RO')}
                  </div>
                </div>
              </div>
            </div>

            {/* IP Information Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/40 rounded-lg border border-slate-600/40 p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  🌍 Informații IP Curent
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-300">🌐 IP:</div>
                  <div className="text-white font-mono">{ipInfo.query || ipInfo.ip}</div>
                  <div className="text-slate-300">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Țară:</div>
                  <div className="text-white">{ipInfo.country}</div>
                  <div className="text-slate-300">🗺️ Regiune:</div>
                  <div className="text-white">{ipInfo.region}</div>
                  <div className="text-slate-300">🏙️ Oraș:</div>
                  <div className="text-white">{ipInfo.city}</div>
                  <div className="text-slate-300">🌐 ISP:</div>
                  <div className="text-white">{ipInfo.isp}</div>
                  <div className="text-slate-300">📍 Coordonate:</div>
                  <div className="text-white font-mono">{ipInfo.lat?.toFixed(4)}, {ipInfo.lon?.toFixed(4)}</div>
                </div>
              </div>

              <div className="bg-slate-700/40 rounded-lg border border-slate-600/40 p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Network className="w-4 h-4 text-green-400" />
                  📊 Analiza DNS
                </h4>
                {testResult.additionalSources && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">🏠 DNS Local:</span>
                      <span className="text-white">{testResult.additionalSources.local?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">🌐 DNS Public:</span>
                      <span className="text-white">{testResult.additionalSources.public?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">🏢 DNS ISP:</span>
                      <span className="text-white">{testResult.additionalSources.isp?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">🌍 DNS Internațional:</span>
                      <span className="text-white">{testResult.additionalSources.international?.length || 0}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comprehensive DNS Servers Table */}
            <div className="bg-slate-700/40 rounded-lg border border-slate-600/40 p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                🌐 Servere DNS Detectate - Analiză Completă 🔍
              </h3>
              
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600/30 hover:bg-slate-700/20">
                      <TableHead className="text-blue-200 font-semibold">📊 Tip</TableHead>
                      <TableHead className="text-blue-200 font-semibold">🌐 IP Server</TableHead>
                      <TableHead className="text-blue-200 font-semibold">🏷️ Hostname</TableHead>
                      <TableHead className="text-blue-200 font-semibold">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Țară</TableHead>
                      <TableHead className="text-blue-200 font-semibold">🏢 ISP/Organizație</TableHead>
                      <TableHead className="text-blue-200 font-semibold">📡 Protocol</TableHead>
                      <TableHead className="text-blue-200 font-semibold">⚡ Timp Răspuns</TableHead>
                      <TableHead className="text-blue-200 font-semibold">🛡️ Fiabilitate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getAllServers().map((server, index) => (
                      <TableRow key={`${server.ip}-${index}`} className="border-slate-600/20 hover:bg-slate-700/10">
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-lg">{getServerTypeIcon(server)}</span>
                            <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                              {getServerTypeLabel(server)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-white font-mono text-sm font-semibold">{server.ip}</TableCell>
                        <TableCell className="text-slate-200 text-sm">{server.hostname || 'N/A'}</TableCell>
                        <TableCell className="text-slate-200 text-sm">{server.country || 'N/A'}</TableCell>
                        <TableCell className="text-slate-200 text-sm">{server.isp || 'N/A'}</TableCell>
                        <TableCell className="text-slate-200 text-sm">{server.protocol || 'UDP'}</TableCell>
                        <TableCell className="text-slate-200 text-sm font-mono">
                          {server.responseTime ? `${server.responseTime}ms` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getReliabilityColor(server.reliability || 'medium')}`}
                          >
                            {server.reliability?.toUpperCase() || 'MEDIUM'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Wifi className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl text-blue-200 mb-2">🔍 Test DNS Avansat Neexecutat</h3>
            <p className="text-slate-300 mb-4">🚀 Apasă butonul "Test DNS Avansat" pentru detectarea reală a serverelor DNS</p>
            <p className="text-sm text-slate-400">⚡ Testul va detecta serverele DNS reale folosite de browser-ul tău prin multiple metode avansate 🌐</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
