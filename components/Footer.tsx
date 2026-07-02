"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = ["about", "products", "technical data", "made in italy", "contact us"];

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
  const [showQueryForm, setShowQueryForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("sent");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQueryForm(true);
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
        {showQueryForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            id="contact-form-section"
            className="w-full bg-white py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="w-full max-w-4xl flex flex-col items-center">
              {submitStatus === "sent" ? (
                /* Thank You Card */
                <div className="text-center flex flex-col items-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="font-ivymode text-[26px] md:text-[48px] text-[#545759] tracking-[0.15em] uppercase font-light">
                    THANK YOU FOR YOUR ENQUIRY
                  </h2>
                  <p className="font-ivymode text-[20px] md:text-[36px] tracking-[0.05em] text-[#545759]">
                    Our team will get in touch with you shortly.
                  </p>
                  <div className="pt-8">
                    <button
                      onClick={() => {
                        setSubmitStatus("idle");
                        if (window.location.pathname.includes("explore-collection")) {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          window.location.href = "/nobilita3/explore-collection";
                        }
                      }}
                      className="relative overflow-hidden border border-brand-dark/50 text-[#545759] bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group focus:outline-none"
                    >
                      <span className="absolute inset-0 bg-[#545759] scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                        DISCOVER THE COLLECTION
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Form view */
                <>
                  {/* Title */}
                  <div className="w-full text-center mb-16">
                    <h2 className="font-ivymode text-[28px] md:text-[42px] text-[#545759] tracking-[0.15em] uppercase font-light">
                      SEND YOUR QUERY
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

                    {/* Query */}
                    <div className="relative flex flex-col pt-5">
                      <input
                        type="text"
                        id="query"
                        required
                        placeholder=" "
                        className="peer bg-transparent border-b border-brand-dark/30 py-3 font-michroma text-[12px] md:text-[14px] text-brand-dark focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
                      />
                      <label
                        htmlFor="query"
                        className="absolute left-0 top-6 font-michroma font-bold text-[14px] md:text-[18px] tracking-[0.2em] text-[#545759] uppercase pointer-events-none transition-all duration-200 origin-left
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-7 peer-focus:scale-75
                               peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-75"
                      >
                        QUERY
                      </label>
                    </div>

                    {/* Submit Button with thin outline */}
                    <div className="sm:col-span-2 flex justify-center mt-8">
                      <button
                        type="submit"
                        className="relative overflow-hidden border border-brand-dark/50 text-[#545759] bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group focus:outline-none"
                      >
                        <span className="absolute inset-0 bg-[#545759] scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                          {submitStatus === "sending" ? "SENDING..." : "SUBMIT"}
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lower Footer Area */}
      <div className="w-full min-h-[30vh] bg-[#007190] flex flex-col items-center justify-center pb-10 px-6">
        <div className="w-full max-w-[95rem] mx-auto flex flex-col items-center space-y-6">


          {/* Mobile Navigation */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden w-full flex flex-col items-center justify-center gap-y-4 text-center"
          >
            {links.map((link) => {
              const isContact = link === "contact us";
              return (
                <Link
                  key={link}
                  href={
                    link === "technical data"
                      ? "#technical-data"
                      : link === "products"
                      ? "/explore-collection"
                      : `#${link.replace(/ /g, "-")}`
                  }
                  passHref
                  legacyBehavior
                >
                  <motion.a
                    variants={navItemVariants}
                    onClick={isContact ? handleContactClick : undefined}
                    className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] mx-auto text-center w-fit whitespace-nowrap"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                </Link>
              );
            })}
          </motion.nav>

          {/* Desktop Navigation (Equal gaps, perfect center to logo) */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-[7vw] lg:gap-x-[9.5vw] xl:gap-x-[12vw] text-center px-6 md:px-16 lg:px-24"
          >
            {/* Left Column (about, products) */}
            <div className="flex justify-end gap-x-[7vw] lg:gap-x-[9.5vw] xl:gap-x-[12vw]">
              <Link href="#about" passHref legacyBehavior>
                <motion.a
                  variants={navItemVariants}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] text-center w-fit whitespace-nowrap"
                >
                  about
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </Link>
              <Link href="/nobilita3/explore-collection" passHref legacyBehavior>
                <motion.a
                  variants={navItemVariants}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] text-center w-fit whitespace-nowrap"
                >
                  products
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </Link>
            </div>

            {/* Center Column (technical data - aligned to logo) */}
            <div className="flex justify-center">
              <Link href="#technical-data" passHref legacyBehavior>
                <motion.a
                  variants={navItemVariants}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] text-center w-fit whitespace-nowrap"
                >
                  technical data
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </Link>
            </div>

            {/* Right Column (made in italy, contact us) */}
            <div className="flex justify-start gap-x-[vw] lg:gap-x-[8.5vw] xl:gap-x-[11vw]">
              <Link href="#made-in-italy" passHref legacyBehavior>
                <motion.a
                  variants={navItemVariants}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] text-center w-fit whitespace-nowrap"
                >
                  made in italy
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </Link>
              <Link href="#contact-us" passHref legacyBehavior>
                <motion.a
                  variants={navItemVariants}
                  onClick={handleContactClick}
                  className="font-ivymode font-light text-white tracking-[0.05em] relative group text-[clamp(18px,2.5vw,22px)] text-center w-fit whitespace-nowrap"
                >
                  contact us
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </Link>
            </div>
          </motion.nav>

          {/* Logo with fade in & slide up delay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="w-[300px] pt-20"
          >
            <img
              src="/nobilita3/images/NOBILITA_white.png"
              alt="Porcellana Nobilita"
              className="w-full h-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
