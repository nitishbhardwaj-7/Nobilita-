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
import FeaturedProduct from "@/components/FeaturedProduct";
// import LanguageSwitcher from "@/components/LanguageSwitcher";

let hasLoadedGlobal = false;

export default function HomeClient({ cmsData }: { cmsData: any }) {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("has_seen_nobilita_loader");
      if (seen === "true" || hasLoadedGlobal) {
        hasLoadedGlobal = true;
        return false;
      }
    }
    return !hasLoadedGlobal;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("has_seen_nobilita_loader");
      if (seen === "true" || hasLoadedGlobal) {
        setIsLoading(false);
        hasLoadedGlobal = true;
        return;
      }
    }

    // Fallback safety timer: force-hide loader after 10 seconds if needed
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
      hasLoadedGlobal = true;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("has_seen_nobilita_loader", "true");
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const d = cmsData || {};

  const handleComplete = () => {
    setIsLoading(false);
    hasLoadedGlobal = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("has_seen_nobilita_loader", "true");
    }
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
      <ApplicationsSection onTileClick={(prodName) => setActiveProduct(prodName)} />
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
      <FeaturedProduct
        activeProduct={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </main>
  );
}
