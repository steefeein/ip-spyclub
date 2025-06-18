
import { SearchSection } from '@/components/SearchSection';
import { LocationCard } from '@/components/LocationCard';
import { ISPCard } from '@/components/ISPCard';
import { SecurityCard } from '@/components/SecurityCard';
import { ToolsCard } from '@/components/ToolsCard';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 max-w-[2000px]">
        <SearchSection 
          currentIP={currentIP}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Results Section */}
        {ipInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <LocationCard ipInfo={ipInfo} />
            <ISPCard ipInfo={ipInfo} />
            <SecurityCard ipInfo={ipInfo} />
            <DNSLeakCard ipInfo={ipInfo} />
            <ToolsCard />
            <BlacklistCard ipInfo={ipInfo} />
          </div>
        )}

        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Index;
