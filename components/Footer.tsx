"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const links = ["about", "products", "technical resources", "made in italy", "contact us"];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("sent");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer id="contact-us" className="w-full flex flex-col bg-white">
      {/* Catalog & Newsletter Section */}
      <div className="w-full py-16 md:py-24 bg-white relative flex justify-center items-center border-t border-b border-brand-dark/10 overflow-hidden">
        {/* Subtle Marble Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg" 
            alt="Marble texture background" 
            className="w-full h-full object-cover opacity-[0.12] pointer-events-none select-none"
          />
        </div>
        
        {/* Buttons Container */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 px-6">
          <a 
            href="/nobilita3/catalog.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brand-dark/80 px-8 py-4 font-michroma text-[11px] md:text-[13px] tracking-[0.25em] text-brand-dark uppercase bg-white/70 hover:bg-brand-dark hover:text-white transition-all duration-300 backdrop-blur-sm min-w-[280px] md:min-w-[340px] text-center"
          >
            DOWNLOAD CATALOG
          </a>
          <button 
            onClick={() => {
              alert("Thank you for subscribing to our newsletter!");
            }}
            className="border border-brand-dark/80 px-8 py-4 font-michroma text-[11px] md:text-[13px] tracking-[0.25em] text-brand-dark uppercase bg-white/70 hover:bg-brand-dark hover:text-white transition-all duration-300 backdrop-blur-sm min-w-[280px] md:min-w-[340px] text-center focus:outline-none"
          >
            SUBSCRIBE TO NEWSLETTER
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full bg-white py-16 md:py-24 px-6 md:px-12 flex flex-col items-center min-h-[500px] justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {submitStatus === "sent" ? (
            /* Thank You Card */
            <div className="text-center flex flex-col items-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <h2 className="font-ivymode text-[26px] md:text-[40px] text-brand-dark tracking-[0.15em] uppercase font-light">
                THANK YOU FOR YOUR ENQUIRY
              </h2>
              <p className="font-cormorant text-[16px] md:text-[20px] text-brand-dark/80 italic font-light">
                Our team will get in touch with you shortly.
              </p>
              <div className="pt-8">
                <button
                  onClick={() => {
                    setSubmitStatus("idle");
                    if (window.location.pathname.includes("explore-collection")) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      window.location.href = "/explore-collection";
                    }
                  }}
                  className="border border-brand-dark/50 bg-white hover:bg-brand-dark hover:text-white transition-all duration-300 px-10 py-3.5 font-ivymode text-[14px] md:text-[16px] tracking-[0.2em] text-brand-dark uppercase focus:outline-none"
                >
                  DISCOVER THE COLLECTION
                </button>
              </div>
            </div>
          ) : (
            /* Form view */
            <>
              {/* Title */}
              <div className="w-full text-center mb-16">
                <h2 className="font-ivymode text-[28px] md:text-[42px] text-brand-dark tracking-[0.15em] uppercase font-light">
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
                    className="absolute left-0 top-7 font-michroma text-[10px] md:text-[12px] tracking-[0.2em] text-brand-dark/60 uppercase pointer-events-none transition-all duration-200 origin-left
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
                    className="absolute left-0 top-7 font-michroma text-[10px] md:text-[12px] tracking-[0.2em] text-brand-dark/60 uppercase pointer-events-none transition-all duration-200 origin-left
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
                    className="absolute left-0 top-7 font-michroma text-[10px] md:text-[12px] tracking-[0.2em] text-brand-dark/60 uppercase pointer-events-none transition-all duration-200 origin-left
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
                    className="absolute left-0 top-7 font-michroma text-[10px] md:text-[12px] tracking-[0.2em] text-brand-dark/60 uppercase pointer-events-none transition-all duration-200 origin-left
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
                    className="border border-brand-dark/50 bg-white hover:bg-brand-dark hover:text-white transition-all duration-300 px-12 py-3 font-michroma text-[10px] md:text-[11px] tracking-[0.25em] text-brand-dark uppercase focus:outline-none"
                  >
                    {submitStatus === "sending" ? "SENDING..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      
      {/* Lower Footer Area */}
      <div className="w-full min-h-[30vh] bg-[#007190] flex flex-col items-center justify-center py-10 md:py-12 px-6">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-12">
          
          {/* Horizontal Rule draws left-to-right on scroll */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-[1px] bg-white/20 origin-left"
          />

          {/* Links with stagger */}
          <motion.nav 
            variants={navContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-6 md:justify-between w-full"
          >
            {links.map((link) => (
              <motion.a 
                key={link}
                variants={navItemVariants}
                href={`#${link.replace(/ /g, "-")}`}
                className="font-cormorant font-light text-white tracking-[0.05em] uppercase relative group text-[clamp(18px,2.5vw,26px)]"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.nav>
          
          {/* Logo with fade in & slide up delay */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="w-[180px]"
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
