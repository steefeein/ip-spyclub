
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
    <div className="text-center mb-4">
      <div className="mb-3">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔍 IP Analyzer Pro ⚡
        </h1>
      </div>
      
      {/* Search section with current IP inline */}
      <div className="flex justify-center items-center gap-3 mb-2 max-w-2xl mx-auto">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="🌐 IP (ex: 192.168.1.1)"
            value={searchIP}
            onChange={(e) => setSearchIP(e.target.value)}
            className="pl-8 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 h-9 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-9 px-4 text-sm transition-all"
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
              ⚡ Analizează
            </span>
          )}
        </Button>
        
        {currentIP && (
          <div className="text-xs text-gray-300 flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded border border-slate-600">
            <span>🌍 IP-ul tău:</span>
            <span className="text-cyan-400 font-mono">
              {currentIP}
            </span>
          </div>
        )}
      </div>

      {/* Footer info moved to bottom */}
      <div className="mt-8 pt-4 border-t border-slate-700/50">
        <p className="text-xs text-gray-500 mb-1">
          🔥 Verifică IP-uri pentru fraud, blacklist, ISP 💎
        </p>
        <p className="text-xs text-gray-600">
          ⚡ Powered by IP-Score.com • 🛡️ Scamalytics integration pending
        </p>
      </div>
    </div>
  );
};
