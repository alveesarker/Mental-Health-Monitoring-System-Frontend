import DailyLog from "@/components/DailyLog";
import { Header } from "@/components/Header";
import { ProgressCard } from "@/components/ProgressCard";
import { RecommendationsCard } from "@/components/RecommendationsCard";
import { SessionCard } from "@/components/SessionCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-start justify-evenly gap-2">
          {/* Left Column - Daily Log */}
          <div className="lg:col-span-1">
            {/* <DailyLogCard /> */}
            <DailyLog />
          </div>

          {/* Middle Column - Recommendations & Sessions */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div>
              <RecommendationsCard />
            </div>
            <div className="flex items-center mt-3 gap-2 justify-between">
              <div>
                <ProgressCard />
              </div>
              <div>
                <SessionCard />
              </div>
            </div>
            {/* <RecentNotesCard /> */}
          </div>

          {/* Right Column - Stats & Progress */}
          {/* <div className="lg:col-span-1 space-y-6">
            <WellbeingScoreCard />
            <ProgressCard />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Index;
