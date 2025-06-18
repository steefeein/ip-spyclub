
import { SearchSection } from '@/components/SearchSection';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">🌟</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse opacity-30">🔥</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-spin opacity-25" style={{animationDuration: '3s'}}>⚡</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce opacity-20" style={{animationDelay: '1s'}}>💎</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-pulse opacity-15">🚀</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-spin opacity-20" style={{animationDuration: '4s'}}>🌐</div>
      </div>
      
      <div className="container mx-auto px-4 py-4 max-w-[2000px] relative z-10">
        <SearchSection 
          currentIP={currentIP}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Compact Results Section */}
        {ipInfo && (
          <div className="space-y-4">
            {/* Compact top cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <ISPCard ipInfo={ipInfo} />
              <SecurityCard ipInfo={ipInfo} />
              <ToolsCard />
              <BlacklistCard ipInfo={ipInfo} />
            </div>
            
            {/* DNS Leak Test - Full width */}
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
