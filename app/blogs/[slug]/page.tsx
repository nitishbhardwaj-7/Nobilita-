"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

interface ContentBlock {
  type: "paragraph" | "heading" | "point" | "image";
  text?: string;
  title?: string;
  src?: string;
  alt?: string;
}

interface BlogPost {
  title: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  content: ContentBlock[];
  tag?: string;
  excerpt?: string;
}

const blogPostsData: Record<string, BlogPost> = {
  "the-next-generation-porcelain": {
    title: "The Next Generation of Porcelain",
    author: "GLAZE Granite & Marble",
    authorImage: "https://miro.medium.com/v2/resize:fill:128:128/1*TneGUA8HA5AIlu6ioNFw6Q.png",
    date: "Jul 16, 2026",
    readTime: "4 min read",
    heroImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*S7CYuAefiMtkZCYVV9fJ0A.jpeg",
    heroImageAlt: "Luxury villa interior featuring next generation large format porcelain surfaces",
    tag: "INNOVATION",
    excerpt: "Across Dubai’s high-end residential properties, a shifting trend toward ultra-engineered large format porcelain slabs is redefining modern interior design.",
    content: [
      {
        type: "paragraph",
        text: "Across Dubai’s Emirates Hills, Palm Jumeirah, Abu Dhabi’s Saadiyat Island, high-end residential properties are shifting toward ultra-engineered large format porcelain slabs. This is less about replacing natural stone, and more about moving into a new material category altogether. These are not the older generation of porcelain with repetitive patterns or artificial-looking surfaces, but advanced surfaces manufactured with the same attention to detail as marble and quartzite blocks, cut and finished in large slabs to achieve a more natural, continuous visual language."
      },
      {
        type: "paragraph",
        text: "Measuring up to 320 x 160 cm and available in thicknesses from 6mm to 12mm, these massive surfaces are changing how interior designers handle seamless continuity, durability, and structural weight in luxury villa design."
      },
      {
        type: "heading",
        text: "1. Seamless Monolithic Design (Grout-Free Visuals)"
      },
      {
        type: "paragraph",
        text: "In luxury interior architecture, thick visible grout lines break up a space and make rooms look smaller."
      },
      {
        type: "paragraph",
        text: "Large-format porcelain slabs allow designers to simply clad 3-meter-high walls from floor to ceiling using a single continuous panel."
      },
      {
        type: "point",
        title: "Advanced Graphics",
        text: "High-definition Italian and Spanish manufacturing technologies print hyper-realistic mineral veining deep into the surface, with a body color to match the slab pattern."
      },
      {
        type: "point",
        title: "Flawless Book-Matching",
        text: "Designers can achieve perfect book-matched and end-matched patterns across walls exceeding 10 meters."
      },
      {
        type: "point",
        title: "Realistic Patterns",
        text: "These large-format porcelains are produced with multiple pattern variations so that, like natural marble, the veining continues across slabs with subtle differences. This allows for more natural-looking installations and gives designers flexibility to arrange slabs in different ways, including book matching, end matching, and other layout configurations."
      },
      {
        type: "heading",
        text: "2. Engineered for the Extreme UAE Climate"
      },
      {
        type: "paragraph",
        text: "The coastal desert climate of the United Arab Emirates features high humidity, airborne salinity, and summer temperatures over 45°C. These conditions cause lesser materials to fade, warp, or crack."
      },
      {
        type: "point",
        title: "Zero Porosity",
        text: "Fired at temperatures over 1,200°C, these slabs have a water absorption rate close to zero (<0.05%)."
      },
      {
        type: "point",
        title: "UV-Resistant Facades",
        text: "Free of organic resins or binders, they are completely immune to UV degradation."
      },
      {
        type: "point",
        title: "Indoor-to-Outdoor Flow",
        text: "The exact same material can run seamlessly from an interior living room directly onto an outdoor pool deck or villa facade without weather damage."
      },
      {
        type: "heading",
        text: "3. High-Performance, Low-Maintenance Luxury"
      },
      {
        type: "paragraph",
        text: "While natural marble and onyx remain the preferred choice for many luxury projects, large-format porcelain slabs offer a highly practical alternative for high-traffic, high-use areas such as wet kitchens, bathrooms, and spa environments where temperature and moisture levels vary significantly."
      },
      {
        type: "point",
        title: "Stain & Acid Resistance",
        text: "Porcelain is non-porous and completely impervious to acidic foods, liquids, and household chemicals that etch polished marble."
      },
      {
        type: "point",
        title: "Scratch & Heat Immunity",
        text: "With a MOHs hardness rating comparable to quartz, homeowners can place hot pans directly onto a porcelain kitchen island or chop ingredients on the surface without worrying about scratches."
      },
      {
        type: "point",
        title: "Hygienic & Zero Upkeep",
        text: "Unlike natural stone, porcelain requires no periodic sealing or specialized stone cleaners."
      },
      {
        type: "image",
        src: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*aFkvV-sdmvUTaZmUv2onSg.jpeg",
        alt: "Seamless large format slab book-matching in modern living space"
      },
      {
        type: "heading",
        text: "3. Easier Installation, Less Weight"
      },
      {
        type: "paragraph",
        text: "Large-format porcelain slabs, particularly in 6mm thickness, offer significant installation advantages compared to traditional 20mm natural stone. For developers, architects, and homeowners, the combination of reduced weight, faster installation, and lower structural demands translates into substantial cost and time savings without compromising aesthetics or performance."
      },
      {
        type: "point",
        title: "Up to 70% Lighter",
        text: "A 6mm porcelain slab weighs substantially less than a 20mm marble or granite slab, reducing transportation, handling, and installation complexity."
      },
      {
        type: "point",
        title: "Lower Structural Load",
        text: "The reduced weight places less stress on villa walls, floors, and facade support systems, making it ideal for both new builds and renovation projects."
      },
      {
        type: "point",
        title: "Faster Project Completion",
        text: "Larger coverage areas and easier handling enable installers to complete wall cladding and surface applications more efficiently, helping luxury villa projects meet tight construction schedules."
      },
      {
        type: "point",
        title: "Greater Design Flexibility",
        text: "The lightweight nature of 6mm porcelain allows it to be installed over existing surfaces in certain applications, minimizing demolition work and reducing project downtime."
      },
      {
        type: "paragraph",
        text: "The growing preference for large-format porcelain slabs in the UAE luxury villa market reflects the perfect balance between premium aesthetics and high-performance engineering. Large format surfaces replicate the beauty of natural stone, whilst offering designs that are highly resistant to heat, UV exposure, moisture, stains, and scratches, making them ideal for the region’s demanding climate. With lightweight 6mm options also providing faster installation and reduced structural load, large porcelain slabs have become a practical and sophisticated alternative to traditional natural stone for modern luxury homes."
      },
      {
        type: "image",
        src: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*k31yDAES8k5zxapMVdvOIg.jpeg",
        alt: "Artisanal production and finishing of premium large-format porcelain slabs in Italy"
      },
      {
        type: "paragraph",
        text: "NOBILITA is the true standout in this new generation of large-format porcelain. Made in Sassuolo, Italy, it sits within a lineage of production that has defined modern porcelain innovation for decades. What sets NOBILITA apart is its process. Each surface begins with real marble and stone blocks, which are then recreated by artisans to preserve the natural movement and detail of the original material. The result is a carefully constructed surface where each slab reads as an artwork in its own right. Finishes are built up layer by layer with exceptional precision, giving the material depth, tactility, and variation that pushes it far beyond conventional porcelain."
      }
    ]
  },
  "porcelain-as-flooring": {
    title: "Porcelain as Flooring",
    author: "NOBILITA Editorial Team",
    authorImage: "https://miro.medium.com/v2/resize:fill:128:128/1*TneGUA8HA5AIlu6ioNFw6Q.png",
    date: "Jul 28, 2026",
    readTime: "3 min read",
    heroImage: "/images/blogs page images/white-camouflage-blog.webp",
    heroImageAlt: "Seamless white Camouflage porcelain floor application",
    tag: "LIFESTYLE",
    excerpt: "Porcelain flooring has long been recognized for its durability, but recent innovations have elevated it into the realm of high-end luxury design.",
    content: [
      {
        type: "paragraph",
        text: "Porcelain flooring has long been recognized for its durability, but recent innovations have elevated it into the realm of high-end luxury design. Today’s sophisticated homeowners and commercial developers are choosing large-format porcelain tiles not just for their resilience, but for their ability to transform rooms into unified, visually expansive masterpieces."
      },
      {
        type: "heading",
        text: "The Monolithic Aesthetic"
      },
      {
        type: "paragraph",
        text: "Traditional tiled floors often suffer from the visual interruption of thick, repeating grout lines. With the advent of rectified edge large-format slabs, tiles can now be installed with grout lines of less than 2mm. This creates a unified 'monolithic' plane, allowing the intricate mineral patterns of Calacatta or Arabescato to flow uninterrupted across vast halls."
      },
      {
        type: "heading",
        text: "Stunning Durability and Performance"
      },
      {
        type: "paragraph",
        text: "Beyond aesthetics, premium Italian porcelain offers functional performance that natural stone simply cannot match. It has zero porosity, meaning it will never absorb coffee, wine, or oil spills. It does not require annual sealing or specialized cleaning products, making it the perfect choice for busy family households and high-traffic commercial spaces alike."
      },
      {
        type: "heading",
        text: "Sassuolo Innovation"
      },
      {
        type: "paragraph",
        text: "NOBILITA porcelain flooring represents the pinnacle of this technological revolution. Manufactured in Sassuolo, Italy, our surfaces are built using advanced artisan-designed screens that layer color and texture to achieve realistic depths. When walking across a NOBILITA floor, you feel the organic movement and subtle texture that mimics natural stone, combined with the lifetime strength of porcelain."
      }
    ]
  }
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug];
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!post) {
    notFound();
  }

  const otherPosts = Object.entries(blogPostsData)
    .filter(([slug]) => slug !== params.slug)
    .map(([slug, post]) => ({
      slug,
      ...post,
    }));

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % otherPosts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + otherPosts.length) % otherPosts.length);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between overflow-x-hidden relative">
      {/* Sticky White Header matching Medium layout */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
        <div />
        <div className="text-right">
          <Link
            href="/#contact-us"
            className="relative overflow-hidden group border border-neutral-900 px-4 py-1.5 inline-flex items-center justify-center transition-colors duration-500"
          >
            <span className="absolute -inset-[1px] bg-neutral-900 scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
            <span className="relative z-10 font-ivymode text-[12px] tracking-wider uppercase text-neutral-900 transition-colors duration-500 group-hover:text-white">
              Enquire
            </span>
          </Link>
        </div>
      </header>

      {/* Main Column */}
      <main className="w-full max-w-[720px] mx-auto px-6 pt-12 pb-12">
        {/* Title with Back Arrow in Left Margin */}
        <div className="relative mb-8">
          <Link
            href="/blogs"
            className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-100 transition-all duration-300 mb-4 sm:mb-0 sm:absolute sm:-left-14 md:-left-16 lg:-left-20 sm:top-1"
            aria-label="Back to blogs"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 group-hover:text-neutral-900 transition-transform duration-300 transform group-hover:-translate-x-0.5"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <h1 className="font-ivymode font-bold text-neutral-900 text-[32px] sm:text-[40px] md:text-[46px] leading-[1.12] tracking-[0.05em] uppercase text-center">
            {post.title}
          </h1>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mb-10 w-full"
        >
          <div className="w-full overflow-hidden rounded-sm shadow-sm">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
          </div>
        </motion.div>

        {/* Blog Post Body Content with high-end editorial styling */}
        <article className="font-ivymode text-[18px] sm:text-[20px] md:text-[21px] leading-[1.65] text-neutral-800 tracking-wide space-y-8">
          {post.content.map((block, idx) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p key={idx} className="font-light text-justify">
                    {block.text}
                  </p>
                );
              case "heading":
                return (
                  <h2
                    key={idx}
                    className="font-ivymode font-bold text-[#007190] text-[22px] sm:text-[26px] md:text-[28px] tracking-[0.05em] uppercase leading-tight pt-6 pb-2"
                  >
                    {block.text}
                  </h2>
                );
              case "point":
                return (
                  <p key={idx} className="font-light text-justify">
                    <strong className="font-ivymode font-bold italic text-[#007190] text-[18px] sm:text-[20px] md:text-[21px] mr-2">
                      {block.title}:
                    </strong>
                    {block.text}
                  </p>
                );
              case "image":
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 1.06 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 w-full"
                  >
                    <div className="w-full overflow-hidden rounded-sm shadow-sm">
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      />
                    </div>
                  </motion.div>
                );
              default:
                return null;
            }
          })}
        </article>
      </main>

      {/* Recent Blogs (What's New) Section */}
      {otherPosts.length > 0 && (
        <section className="w-full bg-white border-t border-neutral-100 pt-12 pb-12 px-6 md:px-12">
          <div className="w-full max-w-[1200px] mx-auto relative">
            <h2 className="font-ivymode text-center text-neutral-900 text-[28px] sm:text-[36px] md:text-[40px] leading-[1.2] tracking-[0.08em] uppercase mb-12">
              Recent Blogs
            </h2>

            {/* Carousel Row Container */}
            <div className="relative w-full flex items-center justify-center">
              {/* Left Arrow Button */}
              {otherPosts.length > 1 && (
                <button
                  onClick={prevSlide}
                  className="absolute left-[-20px] sm:left-[-30px] md:left-[-50px] z-20 group flex items-center justify-center w-10 h-10 rounded-full bg-neutral-600 hover:bg-neutral-800 text-white transition-all duration-300 focus:outline-none shadow-md"
                  aria-label="Previous slide"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-300"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              {/* Card Container */}
              <div className="w-full bg-[#f9f9f9] border border-neutral-100 rounded-sm p-6 sm:p-8 md:p-12 min-h-[360px] flex items-center relative overflow-hidden">
                <div className="w-full">
                  {/* Slide Content with fade/slide animation */}
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full"
                  >
                    {/* Left Column: Image */}
                    <div className="w-full md:w-[48%] aspect-[16/10] overflow-hidden rounded-sm shadow-sm relative bg-neutral-100">
                      <img
                        src={otherPosts[activeIndex].heroImage}
                        alt={otherPosts[activeIndex].heroImageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Right Column: Info */}
                    <div className="w-full md:w-[52%] flex flex-col items-start justify-center text-left">
                      <div className="flex items-center gap-4 mb-4 select-none">
                        <span className="border border-neutral-300 rounded-full px-3 py-0.5 text-[10px] font-ivymode tracking-widest text-neutral-600 uppercase font-light">
                          {otherPosts[activeIndex].tag || "ARTICLE"}
                        </span>
                        <span className="font-ivymode text-[11px] text-neutral-500 tracking-wider">
                          {formatDate(otherPosts[activeIndex].date)}
                        </span>
                      </div>

                      <h3 className="font-ivymode font-bold text-neutral-900 text-[20px] sm:text-[24px] md:text-[26px] leading-[1.25] tracking-[0.03em] mb-4 uppercase">
                        {otherPosts[activeIndex].title}
                      </h3>

                      <p className="font-ivymode font-light text-[14px] sm:text-[15px] text-neutral-600 leading-[1.6] mb-6 text-left line-clamp-3">
                        {otherPosts[activeIndex].excerpt || (
                          otherPosts[activeIndex].content.find((c) => c.type === "paragraph")?.text || ""
                        )}
                      </p>

                      <Link
                        href={`/blogs/${otherPosts[activeIndex].slug}`}
                        className="bg-black hover:bg-neutral-800 text-white rounded-full px-6 py-2.5 font-ivymode text-[10px] sm:text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 font-medium select-none"
                      >
                        Read More
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Arrow Button */}
              {otherPosts.length > 1 && (
                <button
                  onClick={nextSlide}
                  className="absolute right-[-20px] sm:right-[-30px] md:right-[-50px] z-20 group flex items-center justify-center w-10 h-10 rounded-full bg-neutral-600 hover:bg-neutral-800 text-white transition-all duration-300 focus:outline-none shadow-md"
                  aria-label="Next slide"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </div>

            {/* Slide Indicators */}
            {otherPosts.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {otherPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-[2px] transition-all duration-300 focus:outline-none ${
                      index === activeIndex
                        ? "w-8 bg-neutral-800"
                        : "w-6 bg-neutral-200 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
