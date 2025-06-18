
import { SearchSection } from '@/components/SearchSection';
import { ISPCard } from '@/components/ISPCard';
import { SecurityCard } from '@/components/SecurityCard';
import { BrowserAnalysisCard } from '@/components/BrowserAnalysisCard';
import { BlacklistCard } from '@/components/BlacklistCard';
import { DNSLeakCard } from '@/components/DNSLeakCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useIPAnalysis } from '@/hooks/useIPAnalysis';

const Index = () => {
  const { currentIP, ipInfo, loading, fetchIPInfo } = useIPAnalysis();

  const handleSearch = (ip: string) => {
    fetchIPInfo(ip);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      <div className="container mx-auto px-4 py-6 max-w-[2000px] relative z-10">
        <SearchSection 
          currentIP={currentIP}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Results Section */}
        {ipInfo && (
          <div className="space-y-4">
            {/* Top section with compact cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <ISPCard ipInfo={ipInfo} />
              <SecurityCard ipInfo={ipInfo} />
              <BrowserAnalysisCard ipInfo={ipInfo} />
              <BlacklistCard ipInfo={ipInfo} />
            </div>
            
            {/* DNS Leak Test - Full width positioned higher */}
            <div className="w-full">
              <DNSLeakCard ipInfo={ipInfo} />
            </div>
          </div>
        )}

        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Index;
