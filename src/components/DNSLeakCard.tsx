
import React, { useState } from 'react';
import { Shield, Globe, AlertTriangle, CheckCircle, Loader2, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DNSLeakTestService } from '@/services/dnsLeakTestService';
import { IPInfo } from '@/types/ip';

interface DNSLeakCardProps {
  ipInfo?: IPInfo;
}

interface DNSServer {
  ip: string;
  hostname?: string;
  country?: string;
  isp?: string;
  type?: 'resolver' | 'authoritative';
}

interface DNSLeakTestResult {
  servers: DNSServer[];
  leakDetected: boolean;
  userLocation?: {
    country: string;
    region: string;
  };
  testStatus: 'running' | 'completed' | 'error';
  message?: string;
}

export const DNSLeakCard = ({ ipInfo }: DNSLeakCardProps) => {
  const [testResult, setTestResult] = useState<DNSLeakTestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDNSLeakTest = async () => {
    setIsRunning(true);
    setTestResult({
      servers: [],
      leakDetected: false,
      testStatus: 'running'
    });

    try {
      const result = await DNSLeakTestService.performDNSLeakTest(ipInfo?.ip);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        servers: [],
        leakDetected: false,
        testStatus: 'error',
        message: 'Eroare în timpul testului DNS'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = () => {
    if (!testResult) return <Shield className="w-6 h-6 text-blue-400" />;
    
    switch (testResult.testStatus) {
      case 'running':
        return <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />;
      case 'completed':
        return testResult.leakDetected 
          ? <AlertTriangle className="w-6 h-6 text-red-400" />
          : <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      default:
        return <Shield className="w-6 h-6 text-blue-400" />;
    }
  };

  const getStatusColor = () => {
    if (!testResult) return 'blue';
    
    switch (testResult.testStatus) {
      case 'running':
        return 'blue';
      case 'completed':
        return testResult.leakDetected ? 'red' : 'green';
      case 'error':
        return 'orange';
      default:
        return 'blue';
    }
  };

  return (
    <TooltipProvider>
      <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 backdrop-blur-xl border-slate-500/20 hover:border-purple-400/30 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
        <CardHeader className="pb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-50"></div>
          <CardTitle className="flex items-center gap-3 text-white relative z-10">
            <div className="p-2 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30">
              {getStatusIcon()}
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-lg font-bold">DNS Leak Test</span>
              <span className="text-xs text-purple-300 font-normal">Verifică securitatea DNS</span>
            </div>
            <Badge 
              variant="secondary" 
              className={`ml-auto bg-${getStatusColor()}-500/20 text-${getStatusColor()}-300 border-${getStatusColor()}-400/30 hover:bg-${getStatusColor()}-500/30 transition-colors`}
            >
              DNS
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Test Controls */}
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-400/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 text-sm">Status Test DNS:</span>
              <Button 
                onClick={runDNSLeakTest}
                disabled={isRunning}
                variant="outline" 
                className="border-purple-400/30 text-purple-300 hover:bg-purple-500/20 disabled:opacity-50"
                size="sm"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testez...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Pornește Test
                  </>
                )}
              </Button>
            </div>
            
            {testResult?.message && (
              <div className={`p-3 rounded-lg text-sm ${
                testResult.leakDetected 
                  ? 'bg-red-500/20 text-red-300 border border-red-400/30' 
                  : testResult.testStatus === 'error'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                  : 'bg-green-500/20 text-green-300 border border-green-400/30'
              }`}>
                {testResult.message}
              </div>
            )}
          </div>

          {/* DNS Servers Table */}
          {testResult?.servers && testResult.servers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                Servere DNS Detectate ({testResult.servers.length})
              </h4>
              
              <div className="bg-slate-800/50 rounded-lg border border-slate-600/30 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600/30 hover:bg-slate-700/20">
                      <TableHead className="text-gray-300 text-xs">IP</TableHead>
                      <TableHead className="text-gray-300 text-xs">Hostname</TableHead>
                      <TableHead className="text-gray-300 text-xs">Țară</TableHead>
                      <TableHead className="text-gray-300 text-xs">ISP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testResult.servers.map((server, index) => (
                      <TableRow key={index} className="border-slate-600/30 hover:bg-slate-700/20">
                        <TableCell className="text-white text-xs font-mono">{server.ip}</TableCell>
                        <TableCell className="text-gray-300 text-xs">
                          {server.hostname || 'N/A'}
                        </TableCell>
                        <TableCell className="text-xs">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              server.country === testResult.userLocation?.country
                                ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                : 'bg-red-500/20 text-red-300 border-red-400/30'
                            }`}
                          >
                            {server.country || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 text-xs">
                          {server.isp || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* User Location Info */}
          {testResult?.userLocation && (
            <div className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Locația ta:</span>
                <span className="text-white font-medium">
                  {testResult.userLocation.country}, {testResult.userLocation.region}
                </span>
              </div>
            </div>
          )}

          {/* Enhanced status indicator */}
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30">
            <div className="flex items-center justify-between">
              <span className="text-purple-300 text-sm font-medium">DNS Security</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  testResult?.leakDetected === false ? 'bg-green-400' : 
                  testResult?.leakDetected === true ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                  Security Check
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
