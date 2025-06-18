
import { Shield, AlertTriangle, CheckCircle, XCircle, Server, Globe, MapPin, Clock, Info, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import { useDNSLeakTest } from '@/hooks/useDNSLeakTest';
import { IPInfo } from '@/types/ip';

interface DNSLeakCardProps {
  ipInfo: IPInfo;
}

export const DNSLeakCard = ({ ipInfo }: DNSLeakCardProps) => {
  const { testResult, isLoading, runTest } = useDNSLeakTest();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400';
      case 'running': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <TooltipProvider>
      <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 backdrop-blur-xl border-slate-500/20 hover:border-purple-400/30 transition-all duration-500 shadow-2xl lg:col-span-2">
        <CardHeader className="pb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-50"></div>
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="flex items-center gap-2 text-white text-base">
              <div className="p-1.5 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30">
                <Network className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">DNS Leak Test</span>
                <span className="text-xs text-purple-300 font-normal">Verificare securitate DNS</span>
              </div>
            </CardTitle>
            <Button 
              onClick={runTest} 
              disabled={isLoading}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500 text-xs px-2 py-1"
            >
              {isLoading ? 'Testez...' : 'Test'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 border border-slate-600/40 h-8">
              <TabsTrigger 
                value="status" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-300 hover:text-white transition-colors text-xs py-1"
              >
                Status
              </TabsTrigger>
              <TabsTrigger 
                value="geoip1" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300 hover:text-white transition-colors text-xs py-1"
              >
                GeoIP1
              </TabsTrigger>
              <TabsTrigger 
                value="geoip2" 
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-300 hover:text-white transition-colors text-xs py-1"
              >
                GeoIP2
              </TabsTrigger>
              <TabsTrigger 
                value="servers" 
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-cyan-300 hover:text-white transition-colors text-xs py-1"
              >
                DNS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="mt-2">
              <div className="space-y-2">
                {testResult ? (
                  <>
                    <div className="flex items-center justify-between p-2 bg-slate-700/40 rounded border border-slate-600/30">
                      <div className="flex items-center gap-2">
                        {testResult.leakDetected ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        <span className="text-white font-medium text-sm">
                          {testResult.leakDetected ? 'DNS Leak Detectat' : 'DNS Securizat'}
                        </span>
                      </div>
                      <Badge 
                        variant={testResult.leakDetected ? "destructive" : "secondary"} 
                        className={`text-xs ${testResult.leakDetected ? "bg-red-500/20 text-red-300 border-red-400/30" : "bg-green-500/20 text-green-300 border-green-400/30"}`}
                      >
                        {testResult.leakDetected ? 'RISC' : 'SIGUR'}
                      </Badge>
                    </div>
                    
                    <div className="p-2 bg-slate-700/40 rounded border border-slate-600/30">
                      <p className="text-xs text-gray-300">{testResult.message}</p>
                    </div>

                    {testResult.userLocation && (
                      <div className="p-2 bg-slate-700/40 rounded border border-slate-600/30">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-blue-400" />
                          <span className="text-xs font-medium text-white">Locația Ta</span>
                        </div>
                        <div className="text-xs text-gray-300 ml-5">
                          <div>{testResult.userLocation.country}</div>
                          <div>{testResult.userLocation.region}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Network className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-xs">Apasă "Test" pentru verificarea DNS</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="geoip1" className="mt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-300 font-semibold text-xs">Sursa Primară (GeoIP1)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Țară</div>
                    <div className="text-white font-medium text-xs">{ipInfo.country}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Regiune</div>
                    <div className="text-white font-medium text-xs">{ipInfo.region}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Oraș</div>
                    <div className="text-white font-medium text-xs">{ipInfo.city}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Cod Poștal</div>
                    <div className="text-white font-medium text-xs">{ipInfo.zip || 'N/A'}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Lat</div>
                    <div className="text-white font-medium text-xs font-mono">{ipInfo.lat.toFixed(3)}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Lon</div>
                    <div className="text-white font-medium text-xs font-mono">{ipInfo.lon.toFixed(3)}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30 col-span-3">
                    <div className="text-gray-400 text-xs">Fus Orar</div>
                    <div className="text-white font-medium text-xs">{ipInfo.timezone}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="geoip2" className="mt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-300 font-semibold text-xs">Sursa Secundară (GeoIP2)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Țară</div>
                    <div className="text-white font-medium text-xs">{ipInfo.countrySecondary || ipInfo.country}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Regiune</div>
                    <div className="text-white font-medium text-xs">{ipInfo.regionSecondary || ipInfo.region}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Oraș</div>
                    <div className="text-white font-medium text-xs">{ipInfo.citySecondary || ipInfo.city}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">Cod Poștal</div>
                    <div className="text-white font-medium text-xs">{ipInfo.zipSecondary || ipInfo.zip || 'N/A'}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">ISP</div>
                    <div className="text-white font-medium text-xs">{ipInfo.isp}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30">
                    <div className="text-gray-400 text-xs">ASN</div>
                    <div className="text-white font-medium text-xs font-mono">{ipInfo.asn || 'N/A'}</div>
                  </div>
                  <div className="p-1.5 bg-slate-700/40 rounded border border-slate-600/30 col-span-3">
                    <div className="text-gray-400 text-xs">Organizație</div>
                    <div className="text-white font-medium text-xs">{ipInfo.org}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="servers" className="mt-2">
              <div className="space-y-2">
                {testResult && testResult.servers.length > 0 ? (
                  testResult.servers.map((server, index) => (
                    <div key={index} className="p-2 bg-slate-700/40 rounded border border-slate-600/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Server className="w-3 h-3 text-cyan-400" />
                          <span className="text-white font-medium font-mono text-xs">{server.ip}</span>
                        </div>
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs">
                          {server.type || 'resolver'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs ml-5">
                        <div>
                          <span className="text-gray-400">Host:</span>
                          <div className="text-white text-xs">{server.hostname || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Țară:</span>
                          <div className="text-white text-xs">{server.country || 'N/A'}</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">ISP:</span>
                          <div className="text-white text-xs">{server.isp || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3">
                    <Server className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-gray-400 text-xs">Nu sunt disponibile date despre serverele DNS</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
