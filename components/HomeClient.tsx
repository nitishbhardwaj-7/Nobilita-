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
import Footer from "@/components/Footer";

export default function HomeClient({ cmsData }: { cmsData: any }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const d = cmsData || {};

  return (
    <main className="w-full min-h-screen bg-white">
      <Loader isLoading={isLoading} />
      <BrandIntro 
        title={d.brandTitle}
        subtitle={d.brandSubtitle}
        buttonText={d.brandBtn}
        image={d.brandImg}
      />
      <LegacySection />
      <CraftsmanshipSection />
      <DimensionsSection />
      <ApplicationsSection />
      <FinishesSection />
      <HeroSection 
        title={d.heroTitle}
        subtitle={d.heroSubtitle}
        buttonText={d.heroBtn}
        bgImage={d.heroImg}
      />
      <Footer />
    </main>
  );
}
