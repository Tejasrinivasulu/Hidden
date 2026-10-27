import LoadingScreen from "@/components/teams/LoadingScreen";
import TeamsHero from "@/components/teams/TeamsHero";
import CommunityDirectory from "@/components/teams/CommunityDirectory";
import Testimonials from "@/components/teams/Testimonials";
import FooterCTA from "@/components/teams/FooterCTA";
import JoinTeamModal from "@/components/teams/JoinTeamModal";
import Footer from "@/components/sections/Footer";

export default function TeamsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent text-[#0f172a] selection:bg-[#2563eb]/20 selection:text-[#0f172a]">
      <LoadingScreen />

      <div className="relative z-10">
        <TeamsHero />
        <CommunityDirectory />
        <Testimonials />
        <FooterCTA />
        <Footer />
      </div>

      <JoinTeamModal />
    </main>
  );
}
