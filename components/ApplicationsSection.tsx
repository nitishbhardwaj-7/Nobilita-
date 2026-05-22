"use client";

import React from "react";
import { motion } from "framer-motion";

const applications = [
  { name: "INTERIOR WALLS", image: "/nobilita3/images/Calacatta Oyster Application 1.jpg" },
  { name: "INTERIOR FLOORS", image: "/nobilita3/images/ccc.jpg" },
  { name: "COUNTERTOPS", image: "/nobilita3/images/mmm.jpg" },
  { name: "EXTERIOR WALLS", image: "/nobilita3/images/15.jpg" },
  { name: "EXTERIOR FLOORS", image: "/nobilita3/images/4.jpg" },
  { name: "FURNITURE", image: "/nobilita3/images/Arabescato Fjord (2).jpg" },
];

export default function ApplicationsSection() {
  return (
    <section className="w-full min-h-[100vh] bg-white flex flex-col pb-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-ivymode font-light text-brand-dark text-[clamp(32px,8vw,60px)] tracking-[0.1em] text-center mt-[70px] mb-[40px] uppercase"
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
            className="relative group overflow-hidden h-[250px] md:h-[300px] lg:h-[auto] min-h-[200px] cursor-pointer"
          >
            <img
              src={app.image}
              alt={app.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className={`absolute inset-0 transition-colors duration-500 bg-black/20 group-hover:bg-white/10`} />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className={`font-ivymode font-normal text-[clamp(16px,4vw,24px)] tracking-[0.2em] uppercase relative z-10 ${["EXTERIOR WALLS", "EXTERIOR FLOORS", "FURNITURE"].includes(app.name)
                  ? "text-brand-dark"
                  : "text-white"
                }`}>
                {app.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
