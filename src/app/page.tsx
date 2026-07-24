import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { LeadFormSection } from "@/components/landing/lead-form-section";

export const metadata = {
  title: "LeadDesk Mini — Stop Losing Clients",
  description:
    "A premium CRM for capturing and managing leads from a single landing page.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-near-black text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <LeadFormSection />
      </main>
      <Footer />
    </div>
  );
}