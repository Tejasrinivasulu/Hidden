import LoadingScreen from "@/components/teams/LoadingScreen";
import FloatingNavigation from "@/components/teams/FloatingNavigation";
import TeamsHero from "@/components/teams/TeamsHero";
import TeamStats from "@/components/teams/TeamStats";
import LeadershipSection from "@/components/teams/LeadershipSection";
import TeamSpotlight from "@/components/teams/TeamSpotlight";
import TeamGrid from "@/components/teams/TeamGrid";
import WorkflowDiagram from "@/components/teams/WorkflowDiagram";
import TeamAchievements from "@/components/teams/TeamAchievements";
import TeamGallery from "@/components/teams/TeamGallery";
import Testimonials from "@/components/teams/Testimonials";
import Timeline from "@/components/teams/Timeline";
import WhyJoin from "@/components/teams/WhyJoin";
import RecruitmentBanner from "@/components/teams/RecruitmentBanner";
import FooterCTA from "@/components/teams/FooterCTA";
import JoinTeamModal from "@/components/teams/JoinTeamModal";
export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-[#071120] text-white overflow-x-hidden selection:bg-[#6BE6FF] selection:text-[#071120]">
      <LoadingScreen />
      <FloatingNavigation />

      <TeamsHero />
      <TeamStats />

      <LeadershipSection />
      <TeamSpotlight />

      <TeamGrid />

      <WorkflowDiagram />
      <TeamAchievements />

      <TeamGallery />
      <Testimonials />
      <Timeline />

      <WhyJoin />
      <RecruitmentBanner />
      <FooterCTA />

      <JoinTeamModal />
    </main>
  );
}
