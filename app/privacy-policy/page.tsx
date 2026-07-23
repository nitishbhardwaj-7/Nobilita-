"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />

      {/* Hero Banner with Title Overlay */}
      <section className="relative w-full h-[300px] md:h-[420px] xl:h-[480px] overflow-hidden bg-gray-900 mt-[64px] md:mt-[80px]">
        <img
          src="/images/Links/Basaltina face 1.jpg"
          alt="Privacy Policy Background"
          className="w-full h-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

        {/* Title overlay - aligned to exact container bounds */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
            <h1 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(36px,6.5vw,80px)] drop-shadow-lg">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="w-full bg-white border-b border-gray-100 py-5">
        <div className="w-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 flex items-center gap-3 text-xs md:text-sm font-ivymode tracking-widest text-[#545759]">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-gray-400 font-light">&rsaquo;</span>
          <span className="font-medium text-black">Privacy Policy</span>
        </div>
      </div>

      {/* Main Privacy Policy Content */}
      <main className="w-full flex-1 bg-white py-12 md:py-16">
        <div className="w-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 font-ivymode text-[#545759] space-y-6">
          
          {/* Main Title & Intro */}
          <div>
            <h2 className="font-ivymode font-light text-[#222222] text-[26px] md:text-[32px] tracking-[0.02em] mb-4">
              Privacy Policy
            </h2>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              At NOBILITA, we value your privacy. This Privacy Policy explains how we collect, use, disclose, and process your personal data when you use our website or otherwise interact with us.
            </p>
          </div>

          {/* Section: What Personal Data Do We Collect */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              What Personal Data Do We Collect?
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light mb-5">
              We may collect the following personal data from you:
            </p>

            <div className="space-y-5">
              <div>
                <h4 className="font-ivymode font-light text-[#222222] text-[18px] md:text-[21px] tracking-[0.02em] mb-1.5">
                  Contact Information:
                </h4>
                <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
                  Your name, email address, phone number, and mailing address.
                </p>
              </div>

              <div>
                <h4 className="font-ivymode font-light text-[#222222] text-[18px] md:text-[21px] tracking-[0.02em] mb-1.5">
                  Inquiry Information:
                </h4>
                <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
                  Information you provide when you contact us with a question or request, such as the nature of your inquiry and any other information you choose to share.
                </p>
              </div>

              <div>
                <h4 className="font-ivymode font-light text-[#222222] text-[18px] md:text-[21px] tracking-[0.02em] mb-1.5">
                  Website Usage Data:
                </h4>
                <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
                  We may collect information about your use of our website, such as the pages you visit, the links you click, and the searches you perform.
                </p>
              </div>
            </div>
          </div>

          {/* Section: How Do We Use Your Personal Data */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              How Do We Use Your Personal Data?
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light mb-3">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              <li>To respond to your inquiries and requests.</li>
              <li>To process your orders and provide you with the services you request.</li>
              <li>To send you marketing communications (with your consent).</li>
              <li>To analyze your use of our website and social media.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
          </div>

          {/* Section: Disclosure of Your Personal Data */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              Disclosure of Your Personal Data
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              We may disclose your personal data to law enforcement agencies or other government officials if required by law.
            </p>
          </div>

          {/* Section: Data Retention */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              Data Retention
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              We will retain your personal data for as long as necessary to fulfill the purposes for which it was collected, or as required by law.
            </p>
          </div>

          {/* Section: Security */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              Security
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              We take steps to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure.
            </p>
          </div>

          {/* Section: Mobile App */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              Mobile App
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              To delete your account in the mobile app, go to the menu, select Profile, tap Delete Account, and confirm by pressing Okay.
            </p>
          </div>

          {/* Section: Changes to this Privacy Policy */}
          <div>
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-8 mb-3">
              Changes to this Privacy Policy
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on our website.
            </p>
          </div>

          {/* Section: Contact Us */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-ivymode font-light text-[#222222] text-[20px] md:text-[24px] tracking-[0.02em] mt-6 mb-3">
              Contact Us
            </h3>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] tracking-widest leading-[1.8] font-light">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:info@nobilita.it" className="text-[#007190] hover:underline font-normal">
                info@nobilita.it
              </a>.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
