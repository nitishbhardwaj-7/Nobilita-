"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NobilitaHouseSVG from "./NobilitaHouseSVG";
import AnimatedNeighborhood from "./AnimatedNeighborhood";

const links = ["about", "products", "technical data", "made in italy", "blogs", "newsletter", "contact us"];

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Footer() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [activeForm, setActiveForm] = useState<"none" | "query" | "catalog" | "newsletter" | "datasheet">("none");
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "italian">("english");

  const triggerPdfDownload = (lang: "english" | "italian") => {
    const pdfUrl = lang === "italian"
      ? "/Pdfs/TECHNICAL%20DATA%20SHEET%20-%20ITALIAN.pdf"
      : "/Pdfs/TECHNICAL%20DATA%20SHEET%20-%20ENGLISH.pdf";
    const fileName = lang === "italian"
      ? "TECHNICAL DATA SHEET - ITALIAN.pdf"
      : "TECHNICAL DATA SHEET - ENGLISH.pdf";

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    const handleOpenQuery = () => {
      setActiveForm("query");
      setSubmitStatus("idle");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-form-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    const handleOpenCatalog = (e?: Event) => {
      const customEvent = e as CustomEvent<{ language?: "english" | "italian" }>;
      if (customEvent?.detail?.language) {
        setSelectedLanguage(customEvent.detail.language);
      }
      setActiveForm("catalog");
      setSubmitStatus("idle");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-form-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    const handleOpenNewsletter = () => {
      setActiveForm("newsletter");
      setSubmitStatus("idle");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-form-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    const handleOpenDatasheet = (e?: Event) => {
      const customEvent = e as CustomEvent<{ language?: "english" | "italian" }>;
      if (customEvent?.detail?.language) {
        setSelectedLanguage(customEvent.detail.language);
      }
      setActiveForm("datasheet");
      setSubmitStatus("idle");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-form-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    window.addEventListener("open-query-form", handleOpenQuery);
    window.addEventListener("open-catalog-form", handleOpenCatalog);
    window.addEventListener("open-newsletter-form", handleOpenNewsletter);
    window.addEventListener("open-datasheet-form", handleOpenDatasheet);

    if (window.location.hash === "#contact-us") {
      handleOpenQuery();
    } else if (window.location.hash === "#download-catalog") {
      handleOpenCatalog();
    } else if (window.location.hash === "#subscribe-newsletter") {
      handleOpenNewsletter();
    } else if (window.location.hash === "#download-datasheet") {
      handleOpenDatasheet();
    }

    return () => {
      window.removeEventListener("open-query-form", handleOpenQuery);
      window.removeEventListener("open-catalog-form", handleOpenCatalog);
      window.removeEventListener("open-newsletter-form", handleOpenNewsletter);
      window.removeEventListener("open-datasheet-form", handleOpenDatasheet);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");

    if (activeForm === "catalog" || activeForm === "datasheet") {
      triggerPdfDownload(selectedLanguage);
    }

    setTimeout(() => {
      setSubmitStatus("sent");
    }, 1500);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveForm("query");
    setSubmitStatus("idle");
    setTimeout(() => {
      const contactSection = document.getElementById("contact-form-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <footer id="contact-us" className="w-full flex flex-col bg-white">


      {/* Contact Form Section */}
      <AnimatePresence initial={false}>
        {activeForm !== "none" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            id="contact-form-section"
            className={`w-full bg-white flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${submitStatus === "sent" ? "py-0 px-0" : "py-16 md:py-24 px-6 md:px-12"
              }`}
          >
            <div className="w-full">
              {submitStatus === "sent" ? (
                /* Split Screen Thank You Card */
                <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[70vh] animate-[fadeIn_0.6s_ease-out]">
                  {/* Left Column: Teal background with House and Logo */}
                  <div className="bg-[#007190] py-16 px-8 flex flex-col items-center justify-center space-y-10">
                    <div className="w-full flex justify-center">
                      <AnimatedNeighborhood />
                    </div>
                    <Link href="/" className="w-[180px] md:w-[220px] inline-block hover:opacity-90 transition-opacity">
                      <img
                        src="/images/NOBILITA_white.png"
                        alt="Porcellana Nobilita"
                        className="w-full h-auto object-contain"
                      />
                    </Link>
                  </div>

                  {/* Right Column: White background with Thank You and CTA */}
                  <div className="bg-white py-12 sm:py-16 px-4 sm:px-8 flex flex-col items-center justify-center text-center space-y-8">
                    {activeForm === "query" ? (
                      <>
                        <h2 className="font-ivymode text-[clamp(16px,4.5vw,34px)] text-[#545759] tracking-[0.10em] sm:tracking-[0.15em] uppercase font-light leading-tight">
                          THANK YOU FOR YOUR ENQUIRY
                        </h2>
                        <p className="font-ivymode text-[clamp(14px,1.4vw,18px)] tracking-[0.05em] text-[#545759]">
                          Our team will get in touch with you shortly.
                        </p>
                      </>
                    ) : activeForm === "catalog" ? (
                      <>
                        <h2 className="font-ivymode text-[clamp(16px,4.5vw,34px)] text-[#545759] tracking-[0.10em] sm:tracking-[0.15em] uppercase font-light leading-tight">
                          DOWNLOADED SUCCESSFULLY
                        </h2>
                        <p className="font-ivymode text-[clamp(14px,1.4vw,18px)] tracking-[0.05em] text-[#545759] max-w-lg leading-relaxed">
                          Our team is available to provide tailored technical support and product guidance based on your project&apos;s specific requirements.
                        </p>
                      </>
                    ) : activeForm === "newsletter" ? (
                      <>
                        <h2 className="font-ivymode text-[clamp(16px,4.5vw,34px)] text-[#545759] tracking-[0.10em] sm:tracking-[0.15em] uppercase font-light leading-tight">
                          SUBSCRIPTION CONFIRMED
                        </h2>
                        <p className="font-ivymode text-[clamp(14px,1.4vw,18px)] tracking-[0.05em] text-[#545759] max-w-lg leading-relaxed">
                          Thank you for joining the NOBILITA community, where architectural excellence meets Italian craftsmanship.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="font-ivymode text-[clamp(16px,4.5vw,34px)] text-[#545759] tracking-[0.10em] sm:tracking-[0.15em] uppercase font-light leading-tight">
                          YOUR DESIGN RESOURCE IS READY
                        </h2>
                        <p className="font-ivymode text-[clamp(14px,1.4vw,18px)] tracking-[0.05em] text-[#545759] max-w-lg leading-relaxed">
                          Our team is available to provide tailored technical support and product guidance based on your project&apos;s specific requirements.
                        </p>
                      </>
                    )}

                    <div className="flex justify-center w-full px-2">
                      <button
                        onClick={() => {
                          setSubmitStatus("idle");
                          setActiveForm("none");
                          if (window.location.pathname.includes("explore-collection")) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            window.location.href = "/explore-collection";
                          }
                        }}
                        className="relative overflow-hidden border border-[#545759] text-[#545759] bg-transparent px-4 sm:px-8 py-2.5 font-michroma text-[clamp(10px,3vw,14px)] md:text-[clamp(12px,1.5vw,20px)] tracking-[0.08em] sm:tracking-[0.18em] md:tracking-[0.25em] transition-colors duration-500 uppercase group text-center focus:outline-none max-w-full"
                      >
                        <span className="absolute -inset-[1px] bg-[#545759] scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-white block whitespace-nowrap">
                          DISCOVER THE COLLECTION
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Form view */
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                  <>
                    {/* Title */}
                    <div className="w-full text-center mb-16 overflow-hidden">
                      <h2 className="font-ivymode text-[clamp(20px,3.5vw,48px)] text-[#545759] tracking-[0.15em] uppercase font-light whitespace-nowrap">
                        {activeForm === "query"
                          ? "SEND YOUR QUERY"
                          : activeForm === "catalog"
                            ? "DOWNLOAD CATALOG"
                            : activeForm === "newsletter"
                              ? "SUBSCRIBE TO NEWSLETTER"
                              : "DOWNLOAD DATASHEET"}
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 w-full">
                      {/* Name */}
                      <div className="relative flex flex-col pt-5">
                        <input
                          type="text"
                          id="name"
                          required
                          placeholder=" "
                          className="peer bg-transparent border-b border-brand-dark/30 py-3 font-michroma text-[12px] md:text-[14px] text-brand-dark focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-0 top-6 font-michroma font-bold text-[14px] md:text-[18px] tracking-[0.2em] text-[#545759] uppercase pointer-events-none transition-all duration-200 origin-left
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-7 peer-focus:scale-75
                               peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          NAME
                        </label>
                      </div>

                      {/* Email */}
                      <div className="relative flex flex-col pt-5">
                        <input
                          type="email"
                          id="email"
                          required
                          placeholder=" "
                          className="peer bg-transparent border-b border-brand-dark/30 py-3 font-michroma text-[12px] md:text-[14px] text-brand-dark focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-0 top-6 font-michroma font-bold text-[14px] md:text-[18px] tracking-[0.2em] text-[#545759] uppercase pointer-events-none transition-all duration-200 origin-left
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-7 peer-focus:scale-75
                               peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          EMAIL
                        </label>
                      </div>

                      {/* Phone */}
                      <div className="relative flex flex-col pt-5">
                        <input
                          type="tel"
                          id="phone"
                          required
                          placeholder=" "
                          className="peer bg-transparent border-b border-brand-dark/30 py-3 font-michroma text-[12px] md:text-[14px] text-brand-dark focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-0 top-6 font-michroma font-bold text-[14px] md:text-[18px] tracking-[0.2em] text-[#545759] uppercase pointer-events-none transition-all duration-200 origin-left
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-7 peer-focus:scale-75
                               peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          PHONE
                        </label>
                      </div>

                      {/* Message or Query */}
                      <div className="relative flex flex-col pt-5">
                        <input
                          type="text"
                          id="message-or-query"
                          required={activeForm === "query"}
                          placeholder=" "
                          className="peer bg-transparent border-b border-brand-dark/30 py-3 font-michroma text-[12px] md:text-[14px] text-brand-dark focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
                        />
                        <label
                          htmlFor="message-or-query"
                          className="absolute left-0 top-6 font-michroma font-bold text-[14px] md:text-[18px] tracking-[0.2em] text-[#545759] uppercase pointer-events-none transition-all duration-200 origin-left
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-7 peer-focus:scale-75
                               peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          {activeForm === "query" ? "PROJECT DETAILS" : "MESSAGE (OPTIONAL)"}
                        </label>
                      </div>

                      {/* Submit Button with thin outline */}
                      <div className="sm:col-span-2 flex justify-center mt-8">
                        <button
                          type="submit"
                          className="relative overflow-hidden border border-brand-dark/50 text-[#545759] bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group focus:outline-none"
                        >
                          <span className="absolute -inset-[1px] bg-[#545759] scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                            {submitStatus === "sending" ? "SUBMITTING..." : "SUBMIT"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lower Footer Area */}
      <div className="w-full bg-[#007190] flex flex-col items-center px-6 pt-6 md:pt-6">
        <div className="w-full max-w-[95rem] mx-auto flex flex-col items-center space-y-0">


          {/* Mobile Navigation */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden pt-10 w-full flex flex-col items-center justify-center gap-y-4 text-center"
          >
            {links.map((link) => {
              const isContact = link === "contact us";
              return (
                <motion.a
                  key={link}
                  variants={navItemVariants}
                  href={
                    link === "technical data"
                      ? "/technical-data"
                      : link === "products"
                        ? "/explore-collection"
                        : link === "about"
                          ? "/our-story"
                          : link === "made in italy"
                            ? "/made-in-italy"
                            : link === "blogs"
                              ? "/blogs"
                              : link === "newsletter"
                                ? "/newsletter"
                                : `#${link.replace(/ /g, "-")}`
                  }
                  onClick={isContact ? handleContactClick : undefined}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] mx-auto text-center w-fit whitespace-nowrap"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* Desktop Navigation (100% mathematically equal spacing & perfect center alignment) */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:flex w-full max-w-[1300px] lg:max-w-[1550px] xl:max-w-[1800px] 2xl:max-w-[2100px] mx-auto items-center justify-between text-center px-6 md:px-12 lg:px-16"
          >
            <motion.a
              variants={navItemVariants}
              href="/our-story"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              about
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="/explore-collection"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              products
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="/technical-data"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              technical data
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="/made-in-italy"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              made in italy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="/blogs"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              blogs
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="/newsletter"
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              newsletter
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              variants={navItemVariants}
              href="#contact-us"
              onClick={handleContactClick}
              className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.2vw,22px)] text-center w-fit whitespace-nowrap"
            >
              contact us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          </motion.nav>

          {/* Logo with fade in & slide up delay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="pt-10 md:pt-10 pb-10 flex justify-center w-full"
          >
            <Link href="/" className="w-[260px] md:w-[320px] inline-block hover:opacity-90 transition-opacity">
              <img
                src="/images/NOBILITA_white.png"
                alt="Porcellana Nobilita"
                className="w-full h-auto object-contain"
              />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="w-full bg-[#007190] py-6 px-6 md:px-16 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 text-white/80 font-light text-xs md:text-sm tracking-wide text-center">
        <Link href="/privacy-policy" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <span>© Copyright 2026 PORCELLANA NOBILITA</span>
        <Link href="/sitemap" className="hover:text-white transition-colors">
          Sitemap
        </Link>
      </div>
    </footer>
  );
}
