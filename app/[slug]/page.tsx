import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 0; // Ensure fresh content

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page || page.status !== "PUBLISHED") {
    return {};
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nobilita.com";
  return getPageMetadata(
    {
      title: page.title,
      seoTitle: page.heroTitle || page.title,
      metaDescription: page.heroDescription,
      featuredImage: page.featuredImage,
    },
    page.title,
    appUrl
  );
}

export default async function CustomPage({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page || page.status !== "PUBLISHED") {
    notFound();
  }

  const sections = (page.sections as any[]) || [];

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden font-ivymode">
      <div>
        {/* Global Navbar */}
        <div className="relative w-full h-24 bg-brand-dark">
          <Navbar />
        </div>

        {/* Dynamic header / hero banner from Page settings if defined */}
        {(page.heroTitle || page.heroDescription) && (
          <header className="relative min-h-[50vh] flex flex-col items-center justify-center py-24 px-6 text-center bg-brand-dark overflow-hidden">
            {page.featuredImage && (
              <>
                <img
                  src={page.featuredImage}
                  alt={page.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </>
            )}
            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              {page.heroTitle && (
                <h1 className="font-ivymode text-white text-center leading-[1.2] tracking-[0.06em] text-[clamp(28px,6vw,64px)] uppercase">
                  {page.heroTitle}
                </h1>
              )}
              {page.heroDescription && (
                <p className="font-montserrat text-white/90 text-center max-w-2xl mx-auto text-[clamp(14px,1.8vw,20px)] font-light leading-relaxed">
                  {page.heroDescription}
                </p>
              )}
            </div>
          </header>
        )}

        {/* Dynamic section blocks loop formatted with high-end luxury branding */}
        <div className="w-full">
          {sections.map((section: any, index: number) => {
            const content = section.content || {};

            switch (section.type) {
              case "hero":
                return (
                  <section 
                    key={section.id || index} 
                    className="relative w-full min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 bg-brand-dark text-center overflow-hidden"
                  >
                    {content.bgImage && (
                      <>
                        <img 
                          src={content.bgImage} 
                          alt={content.title || "Hero banner"} 
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </>
                    )}
                    <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                      {content.title && (
                        <h2 className="font-ivymode text-white text-center leading-[1.1] tracking-[0.05em] text-[clamp(26px,5vw,60px)] uppercase">
                          {content.title}
                        </h2>
                      )}
                      {content.subtitle && (
                        <p className="font-montserrat text-white/80 text-center max-w-2xl mx-auto text-[clamp(14px,1.8vw,20px)] font-light leading-relaxed">
                          {content.subtitle}
                        </p>
                      )}
                      {content.buttonText && content.buttonLink && (
                        <div className="pt-6">
                          <a
                            href={content.buttonLink}
                            className="inline-block border border-white/45 text-white bg-transparent px-8 py-3.5 font-michroma text-xs tracking-[0.2em] transition-all duration-500 hover:bg-white hover:text-brand-dark uppercase"
                          >
                            {content.buttonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </section>
                );

              case "text":
                return (
                  <section 
                    key={section.id || index} 
                    className={`py-24 px-6 md:px-20 ${index % 2 === 0 ? "bg-white" : "bg-brand-cream/40"}`}
                  >
                    <div className="max-w-4xl mx-auto space-y-6 text-center md:text-left">
                      {content.subheading && (
                        <p className="font-michroma text-xs tracking-[0.3em] text-teal-primary uppercase mb-2">
                          {content.subheading}
                        </p>
                      )}
                      {content.heading && (
                        <h3 className="font-ivymode text-brand-dark text-[clamp(22px,4vw,44px)] tracking-[0.08em] uppercase leading-tight">
                          {content.heading}
                        </h3>
                      )}
                      {content.body && (
                        <p className="font-montserrat text-brand-charcoal text-sm md:text-base leading-[1.8] font-light whitespace-pre-line">
                          {content.body}
                        </p>
                      )}
                    </div>
                  </section>
                );

              case "cta":
                return (
                  <section 
                    key={section.id || index} 
                    className="w-full py-20 px-6 md:px-20 bg-[#007190] text-center"
                  >
                    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
                      <div className="space-y-4">
                        {content.title && (
                          <h3 className="font-ivymode text-white text-[clamp(24px,4.5vw,48px)] tracking-[0.1em] uppercase leading-tight">
                            {content.title}
                          </h3>
                        )}
                        {content.text && (
                          <p className="font-montserrat text-white/95 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
                            {content.text}
                          </p>
                        )}
                      </div>
                      {content.btnText && content.btnLink && (
                        <div className="pt-4">
                          <a
                            href={content.btnLink}
                            className="inline-block border border-white/40 text-white bg-transparent px-10 py-4 font-michroma text-xs tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-teal-primary uppercase"
                          >
                            {content.btnText}
                          </a>
                        </div>
                      )}
                    </div>
                  </section>
                );

              case "features":
                return (
                  <section 
                    key={section.id || index} 
                    className="py-24 px-6 md:px-20 bg-brand-cream/20"
                  >
                    <div className="max-w-6xl mx-auto">
                      {content.title && (
                        <h2 className="font-ivymode text-brand-dark text-center text-[clamp(24px,4.5vw,48px)] tracking-[0.1em] uppercase mb-16">
                          {content.title}
                        </h2>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {(content.items || []).map((item: any, idx: number) => (
                          <div key={idx} className="flex flex-col items-center text-center space-y-4">
                            {item.icon && (
                              <div className="text-teal-primary mb-2 text-2xl">
                                {/* Simple representation or fallback */}
                                <span>✦</span>
                              </div>
                            )}
                            <h3 className="font-ivymode text-brand-dark text-xl tracking-[0.06em] uppercase">
                              {item.title || "Feature Title"}
                            </h3>
                            <p className="font-montserrat text-brand-charcoal text-sm leading-relaxed font-light">
                              {item.desc || "Feature description details showing luxury qualities."}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case "testimonials":
                return (
                  <section 
                    key={section.id || index} 
                    className="py-24 px-6 md:px-20 bg-white"
                  >
                    <div className="max-w-4xl mx-auto text-center">
                      {content.title && (
                        <p className="font-michroma text-[10px] tracking-[0.3em] text-teal-primary uppercase mb-12">
                          {content.title}
                        </p>
                      )}
                      <div className="space-y-12">
                        {(content.list || []).map((item: any, idx: number) => (
                          <div key={idx} className="space-y-6">
                            <p className="font-ivymode text-brand-charcoal text-[clamp(18px,2.5vw,26px)] tracking-[0.04em] leading-relaxed italic max-w-3xl mx-auto">
                              "{item.quote || "The attention to detail and Italian craftsmanship of Porcellana Nobilita is unparalleled."}"
                            </p>
                            <div>
                              <p className="font-michroma text-[11px] tracking-[0.2em] text-brand-dark uppercase">
                                {item.author || "Client Name"}
                              </p>
                              {item.role && (
                                <p className="font-montserrat text-xs text-brand-grey-mid tracking-wide mt-1">
                                  {item.role}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case "faq":
                return (
                  <section 
                    key={section.id || index} 
                    className="py-24 px-6 md:px-20 bg-brand-cream/10"
                  >
                    <div className="max-w-3xl mx-auto">
                      {content.title && (
                        <h2 className="font-ivymode text-brand-dark text-center text-[clamp(24px,4vw,40px)] tracking-[0.08em] uppercase mb-16">
                          {content.title}
                        </h2>
                      )}
                      <div className="divide-y divide-brand-dark/10 border-t border-b border-brand-dark/10">
                        {(content.items || []).map((item: any, idx: number) => (
                          <details key={idx} className="group py-2">
                            <summary className="flex justify-between items-center font-ivymode text-brand-dark tracking-wide uppercase text-left py-6 text-base md:text-lg hover:text-teal-primary transition-colors cursor-pointer list-none focus:outline-none">
                              <span>{item.question || "Frequently Asked Question"}</span>
                              <span className="text-xl font-light transform transition-transform duration-300 group-open:rotate-45">+</span>
                            </summary>
                            <div className="font-montserrat text-brand-charcoal leading-relaxed text-sm pb-6 font-light">
                              {item.answer || "Detailed response answering client queries."}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case "gallery":
                return (
                  <section 
                    key={section.id || index} 
                    className="py-24 px-6 md:px-20 bg-white"
                  >
                    <div className="max-w-6xl mx-auto">
                      {content.title && (
                        <h2 className="font-ivymode text-brand-dark text-center text-[clamp(24px,4.5vw,48px)] tracking-[0.1em] uppercase mb-16">
                          {content.title}
                        </h2>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(content.images || []).map((imgUrl: string, idx: number) => (
                          <div key={idx} className="relative aspect-[4/3] overflow-hidden bg-brand-cream/40 group border border-brand-cream">
                            {imgUrl ? (
                              <img 
                                src={imgUrl} 
                                alt={`Gallery item ${idx + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-michroma text-[9px] tracking-wider text-brand-grey-mid">
                                NO IMAGE UPLOADED
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case "rich-text":
                return (
                  <section 
                    key={section.id || index} 
                    className="py-20 px-6 md:px-20 bg-white"
                  >
                    <div
                      className="max-w-4xl mx-auto rich-text-container"
                      dangerouslySetInnerHTML={{ __html: content.html || "" }}
                    />
                  </section>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
