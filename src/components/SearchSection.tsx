
import { useState } from 'react';
import { Search } from 'lucide-react';
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
    
    onSearch(searchIP);
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        IP Analyzer Pro
      </h1>
      <p className="text-xl text-gray-300 mb-2">
        Verifică IP-uri pentru fraud, blacklist, ISP și multe altele
      </p>
      <p className="text-sm text-gray-400 mb-8">
        Powered by IP-Score.com • Scamalytics integration pending API approval
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
  );
};
