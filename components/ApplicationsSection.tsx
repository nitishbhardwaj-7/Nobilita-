"use client";

import React from "react";
import { motion } from "framer-motion";

const applications = [
  { name: "INTERIOR WALLS", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" },
  { name: "INTERIOR FLOORS", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80" },
  { name: "COUNTERTOPS", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
  { name: "EXTERIOR WALLS", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" },
  { name: "EXTERIOR FLOORS", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" },
  { name: "FURNITURE", image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80" },
];

export default function ApplicationsSection() {
  return (
    <section className="w-full min-h-[100vh] bg-white flex flex-col pb-10">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-gormukhi font-light text-brand-dark text-[40px] md:text-[60px] tracking-[0.1em] text-center mt-[70px] mb-[40px] uppercase"
      >
        APPLICATIONS
      </motion.h2>
      
      <div className="flex-1 w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {applications.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
            className="relative group overflow-hidden h-[300px] lg:h-[auto] min-h-[250px] cursor-pointer"
          >
            <img 
              src={app.image} 
              alt={app.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="font-gurmukhi font-light font-normal text-white text-[24px] tracking-[0.2em] uppercase relative z-10">
                {app.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
