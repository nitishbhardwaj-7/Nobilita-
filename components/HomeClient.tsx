"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import HeroSection from "@/components/HeroSection";
import BrandIntro from "@/components/BrandIntro";
import LegacySection from "@/components/LegacySection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import DimensionsSection from "@/components/DimensionsSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import FinishesSection from "@/components/FinishesSection";
import TechnicalDataSection from "@/components/TechnicalDataSection";
import Footer from "@/components/Footer";
// import LanguageSwitcher from "@/components/LanguageSwitcher";

// Global in-memory flag to ensure loader only runs once per website load/refresh.
// It will survive client-side/SPA navigation, but reset on full reload/refresh.
let hasLoadedGlobal = false;

export default function HomeClient({ cmsData }: { cmsData: any }) {
  const [isLoading, setIsLoading] = useState(!hasLoadedGlobal);

  useEffect(() => {
    if (hasLoadedGlobal) {
      setIsLoading(false);
      return;
    }

    // Fallback safety timer: force-hide loader after 10 seconds if needed
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
      hasLoadedGlobal = true;
    }, 10000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const d = cmsData || {};

  const handleComplete = () => {
    setIsLoading(false);
    hasLoadedGlobal = true;
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <Loader isLoading={isLoading} onComplete={handleComplete} />
      {/* <LanguageSwitcher isVisible={!isLoading} /> */}
      <BrandIntro 
        title={d.brandTitle}
        subtitle={d.brandSubtitle}
        buttonText={d.brandBtn}
        image={d.brandImg}
        isLoaderActive={isLoading}
      />
      <CraftsmanshipSection />
      <LegacySection />
      <ApplicationsSection />
      <DimensionsSection />
      <FinishesSection />
      <HeroSection 
        title={d.heroTitle}
        subtitle={d.heroSubtitle}
        buttonText={d.heroBtn}
        bgImage={d.heroImg}
      />
      <TechnicalDataSection />
      <Footer />
    </main>
  );
}
