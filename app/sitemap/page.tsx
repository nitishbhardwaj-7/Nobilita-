"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />

      {/* Hero Banner with Title Overlay */}
      <section className="relative w-full h-[320px] md:h-[440px] xl:h-[500px] overflow-hidden bg-gray-900 mt-[64px] md:mt-[80px]">
        {/* Back Button Arrow */}
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-30">
          <Link
            href="/"
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 hover:border-white/80 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 focus:outline-none"
            aria-label="Go back to home"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-4.5 md:h-4.5 text-white/90 group-hover:text-white transition-transform duration-300 transform group-hover:-translate-x-0.5"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
        </div>

        <img
          src="/images/Links/Calacatta Oyster Application 1.jpg"
          alt="Sitemap Background"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

        {/* Title overlay - aligned to exact container bounds */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
            <h1 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(36px,6.5vw,80px)] drop-shadow-lg">
              Sitemap
            </h1>
          </div>
        </div>
      </section>

      {/* Sitemap Tree Hierarchy */}
      <main className="w-full flex-1 bg-white py-12 md:py-20">
        <div className="w-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 font-ivymode text-[#545759]">
          <ul className="space-y-8 text-base md:text-lg tracking-widest leading-relaxed list-none">
            {/* Profile / Our Story */}
            <li className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/our-story" className="hover:text-[#007190] transition-colors">
                  Profile
                </Link>
              </div>
            </li>

            {/* Products */}
            <li className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                  Products
                </Link>
              </div>
              <ul className="pl-8 md:pl-10 space-y-3.5 text-sm md:text-base lg:text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Arabescato Vagli
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Calacatta Oyster
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Travertino Romano Classico Cross Cut
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Verde Profondo
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Fior Di Melo
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#545759] shrink-0"></span>
                  <Link href="/explore-collection" className="hover:text-[#007190] transition-colors">
                    Ferro Industriale
                  </Link>
                </li>
              </ul>
            </li>

            {/* Technical Data */}
            <li className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/technical-data" className="hover:text-[#007190] transition-colors">
                  Technical Data
                </Link>
              </div>
            </li>

            {/* Made in Italy */}
            <li className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/made-in-italy" className="hover:text-[#007190] transition-colors">
                  Made in Italy
                </Link>
              </div>
            </li>

            {/* Contact Us */}
            <li className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/#contact-us" className="hover:text-[#007190] transition-colors">
                  Contact Us
                </Link>
              </div>
            </li>

            {/* Privacy Policy */}
            <li className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 font-normal text-black text-lg md:text-xl lg:text-2xl">
                <span className="w-2 h-2 rounded-full bg-[#545759] shrink-0"></span>
                <Link href="/privacy-policy" className="hover:text-[#007190] transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
