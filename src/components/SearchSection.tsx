
import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface SearchSectionProps {
  currentIP: string;
  onSearch: (ip: string) => void;
  loading: boolean;
}

export const SearchSection = ({ currentIP, onSearch, loading }: SearchSectionProps) => {
  const [searchIP, setSearchIP] = useState<string>('');

  const handleSearch = () => {
    if (!searchIP.trim()) {
      toast({
        title: "Eroare",
        description: "Te rog introdu un IP valid",
        variant: "destructive"
      });
      return;
    }
    
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(searchIP)) {
      toast({
        title: "Eroare",
        description: "Formatul IP-ului nu este valid",
        variant: "destructive"
      });
      return;
    }
    
    onSearch(searchIP);
  };

  return (
    <div className="text-center mb-6">
      {/* Compact title with animated effects */}
      <div className="relative mb-3">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          🔍 IP Analyzer Pro ⚡
        </h1>
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🚀</div>
        <div className="absolute -top-1 -left-3 text-xl animate-spin">⭐</div>
      </div>
      
      <p className="text-sm text-gray-300 mb-1 flex items-center justify-center gap-2">
        <span>🔥 Verifică IP-uri pentru fraud, blacklist, ISP</span>
        <span className="animate-pulse">💎</span>
      </p>
      <p className="text-xs text-gray-400 mb-4">
        ⚡ Powered by IP-Score.com • 🛡️ Scamalytics integration pending
      </p>
      
      {/* Compact search section */}
      <div className="flex justify-center items-center gap-2 mb-4 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="🌐 IP (ex: 192.168.1.1)"
            value={searchIP}
            onChange={(e) => setSearchIP(e.target.value)}
            className="pl-8 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 h-8 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-8 px-4 text-sm animate-pulse hover:animate-none transition-all"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 animate-spin" />
              🔄
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              ⚡ Analizează 🔍
            </span>
          )}
        </Button>
      </div>

      {currentIP && (
        <div className="text-center mb-4 animate-fade-in">
          <p className="text-xs text-gray-300 flex items-center justify-center gap-2">
            <span>🌍 IP-ul tău:</span>
            <span className="text-cyan-400 font-mono text-sm animate-pulse bg-slate-800/50 px-2 py-1 rounded border border-cyan-400/30">
              {currentIP}
            </span>
            <span className="animate-bounce">🎯</span>
          </p>
        </div>
      )}
    </div>
  );
};
