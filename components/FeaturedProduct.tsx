"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    title: "CALACATTA OYSTER",
    image: "/nobilita3/images/Calacatta Oyster Application 1.jpg",
    dimensions: [
      "6.5MM x 1600 x 3200 (R)",
      "12MM x 1620 x 3240 (G)"
    ],
    faces: [
      "6.5MM — 1 2 3",
      "12MM — BOOKMATCH OF 2"
    ],
    finishes: [
      "6.5MM — POLISHED & HONED",
      "12MM — POLISHED & HONED"
    ]
  },
  {
    id: 2,
    title: "OROBICO",
    image: "/nobilita3/images/Orobico.jpg",
    dimensions: [
      "6.5MM x 1600 x 3200 (R)",
      "12MM x 1620 x 3240 (G)"
    ],
    faces: [
      "6.5MM — 1 2 3 4",
      "12MM — BOOKMATCH"
    ],
    finishes: [
      "6.5MM — POLISHED",
      "12MM — POLISHED & HONED"
    ]
  },
  {
    id: 3,
    title: "ARABESCATO FJORD",
    image: "/nobilita3/images/Arabescato Fjord (2).jpg",
    dimensions: [
      "6.5MM x 1600 x 3200 (R)",
      "12MM x 1620 x 3240 (G)"
    ],
    faces: [
      "6.5MM — 1 2 3 4 5",
      "12MM — BOOKMATCH OF 2"
    ],
    finishes: [
      "6.5MM — MATTE & POLISHED",
      "12MM — POLISHED"
    ]
  },
  {
    id: 4,
    title: "PURE ONIX",
    image: "/nobilita3/images/Pure Onix 1.jpg",
    dimensions: [
      "6.5MM x 1600 x 3200 (R)",
      "12MM x 1600 x 3200 (R)"
    ],
    faces: [
      "6.5MM — 1 2 3 4 5 6",
      "12MM — 1 2 3"
    ],
    finishes: [
      "6.5MM — POLISHED",
      "12MM — POLISHED"
    ]
  }
];

export default function FeaturedProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + products.length) % products.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentProduct = products[currentIndex];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.title} 
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-20">
            
            {/* Top Content: Title and Specs */}
            <div className="mt-8 md:mt-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-ivymode text-brand-dark text-[clamp(28px,6vw,85px)] tracking-[0.1em] uppercase mb-6 md:mb-12 drop-shadow-sm"
              >
                {currentProduct.title}
              </motion.h2>

              {/* Floating Specs Box */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-md p-5 md:p-10 w-full max-w-[450px] shadow-2xl border border-white/50"
              >
                <div className="space-y-4 md:space-y-8">
                  {/* Dimensions */}
                  <div className="flex space-x-4">
                    <div className="w-1.5 h-6 bg-teal-primary/40 mt-1" />
                    <div className="space-y-0.5 md:space-y-2">
                      <h3 className="font-ivymode font-bold text-[9px] md:text-[20px] tracking-[0.2em] text-brand-dark uppercase">DIMENSIONS</h3>
                      <p className="font-michroma text-brand-dark uppercase font-light tracking-wider leading-snug text-[clamp(11px,1.5vw,16px)]">
                        {currentProduct.dimensions.map((dim, i) => (
                          <React.Fragment key={i}>
                            {dim}<br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Faces */}
                  <div className="flex space-x-4">
                    <div className="w-1.5 h-6 bg-teal-primary/40 mt-1" />
                    <div className="space-y-0.5 md:space-y-2">
                      <h3 className="font-ivymode font-bold text-[9px] md:text-[20px] tracking-[0.2em] text-brand-dark uppercase">FACES</h3>
                      <p className="font-michroma text-brand-dark uppercase font-light tracking-wider leading-snug text-[clamp(11px,1.5vw,16px)]">
                        {currentProduct.faces.map((face, i) => (
                          <React.Fragment key={i}>
                            {face}<br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Finishes */}
                  <div className="flex space-x-4">
                    <div className="w-1.5 h-6 bg-teal-primary mt-1" />
                    <div className="space-y-0.5 md:space-y-2">
                      <h3 className="font-ivymode font-bold text-[9px] md:text-[20px] tracking-[0.2em] text-brand-dark uppercase">FINISHES</h3>
                      <p className="font-michroma text-brand-dark uppercase font-light tracking-wider leading-snug text-[clamp(11px,1.5vw,16px)]">
                        {currentProduct.finishes.map((finish, i) => (
                          <React.Fragment key={i}>
                            {finish}<br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation (Fixed outside AnimatePresence) */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-20">
        <div className="w-full flex items-center border-t border-brand-dark/10 pt-8 md:pt-12">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => paginate(-1)}
              className="text-brand-dark md:text-white hover:opacity-50 transition-opacity p-2"
              aria-label="Previous product"
            >
              <svg width="40" height="24" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center">
            <h4 className="font-michroma tracking-[0.2em] text-brand-dark md:text-white uppercase text-center text-[clamp(10px,1.5vw,18px)] mb-4">
              BROWSE FEATURED PRODUCTS
            </h4>
            <div className="flex space-x-3">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-teal-primary w-8" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-8 text-right">
            <button 
              onClick={() => paginate(1)}
              className="text-brand-dark md:text-white hover:opacity-50 transition-opacity p-2"
              aria-label="Next product"
            >
              <svg width="40" height="24" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H39M39 6L34 1M39 6L34 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

