import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { HomePaymentExplorerBanner } from "@/components/site/HomePaymentExplorerBanner";
import { PathwaysSection } from "@/components/site/PathwaysSection";
import { StorySection } from "@/components/site/StorySection";
import { LocalSection } from "@/components/site/LocalSection";
import { FamilySection } from "@/components/site/FamilySection";
import { CompassCtaBanner } from "@/components/site/CompassCtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HomePaymentExplorerBanner />
      <PathwaysSection />
      <StorySection />
      <LocalSection />
      <FamilySection />
      <CompassCtaBanner />
    </>
  );
}
