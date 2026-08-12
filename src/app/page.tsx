import { Hero } from "@/components/site/Hero";
import { PathwaysSection } from "@/components/site/PathwaysSection";
import { StorySection } from "@/components/site/StorySection";
import { LocalSection } from "@/components/site/LocalSection";
import { FamilySection } from "@/components/site/FamilySection";
import { CompassCtaBanner } from "@/components/site/CompassCtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <PathwaysSection />
      <StorySection />
      <LocalSection />
      <FamilySection />
      <CompassCtaBanner />
    </>
  );
}
