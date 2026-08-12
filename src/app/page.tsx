import { Hero } from "@/components/site/Hero";
import { PathwaysSection } from "@/components/site/PathwaysSection";
import { AboutTeaser } from "@/components/site/AboutTeaser";
import { CompassCtaBanner } from "@/components/site/CompassCtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <PathwaysSection />
      <AboutTeaser />
      <CompassCtaBanner />
    </>
  );
}
