"use client";

import React from "react";
import { motion } from "framer-motion";

const links = ["about", "products", "technical resources", "made in italy", "contact us"];

export default function Footer() {
  return (
    <footer id="contact-us" className="w-full flex flex-col">
      {/* Contact Form Section */}
      <div className="w-full min-h-[50vh] bg-white py-12 md:py-16 px-6 md:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <h2 className="font-gurmukhi font-light text-[clamp(32px,5vw,60px)] text-brand-dark tracking-[0.1em] uppercase mb-16 text-center">
            Inquire for Luxury
          </h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-[14px] tracking-[0.3em] text-brand-grey-mid uppercase">Name</label>
              <input 
                type="text" 
                placeholder="YOUR FULL NAME"
                className="bg-transparent border-b border-brand-dark/20 py-3 font-gurmukhi font-light text-[16px] focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-[14px] tracking-[0.3em] text-brand-grey-mid uppercase">Email</label>
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS"
                className="bg-transparent border-b border-brand-dark/20 py-3 font-gurmukhi font-light text-[16px] focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-[14px] tracking-[0.3em] text-brand-grey-mid uppercase">Phone</label>
              <input 
                type="tel" 
                placeholder="YOUR CONTACT NUMBER"
                className="bg-transparent border-b border-brand-dark/20 py-3 font-gurmukhi font-light text-[16px] focus:outline-none focus:border-brand-dark transition-colors placeholder:text-brand-dark/30"
              />
            </div>

            {/* Empty space for grid alignment or more fields */}
            <div className="hidden md:block"></div>

            {/* Query */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-montserrat text-[14px] tracking-[0.3em] text-brand-grey-mid uppercase">Query</label>
              <textarea 
                rows={4}
                placeholder="TELL US ABOUT YOUR PROJECT"
                className="bg-transparent border-b border-brand-dark/20 py-3 font-gurmukhi font-light text-[16px] focus:outline-none focus:border-brand-dark transition-colors resize-none placeholder:text-brand-dark/30"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-12">
              <button className="border border-brand-dark px-8 md:px-16 py-3 md:py-4 font-michroma text-[clamp(12px,1.5vw,14px)] tracking-[0.4em] text-brand-dark uppercase hover:bg-brand-dark hover:text-white transition-all duration-500">
                SEND INQUIRY
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      
      <div className="w-full min-h-[30vh] bg-teal-primary flex flex-col items-center justify-center py-10 md:py-12 px-6">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-12">
          
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-6 md:justify-between w-full">
            {links.map((link) => (
              <a 
                key={link}
                href={`#${link.replace(/ /g, "-")}`}
                className="font-cormorant font-light text-white tracking-[0.05em] uppercase relative group text-[clamp(18px,2.5vw,26px)]"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="w-[180px]">
            <img 
              src="/nobilita/images/NOBILITA_white.png" 
              alt="Porcellana Nobilita" 
              className="w-full h-auto object-contain"
            />
          </div>
          
        </div>
      </div>
    </footer>
  );
}
