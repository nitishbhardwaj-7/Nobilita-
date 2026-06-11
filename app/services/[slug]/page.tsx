import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPageMetadata, generateSchemaScript } from "@/lib/seo";
import Footer from "@/components/Footer";

// Generate SEO Metadata for Service Detail Page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service || service.status !== "PUBLISHED") {
    return {};
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nobilita.com";
  return getPageMetadata(
    {
      seoTitle: service.seoTitle || service.serviceName,
      serviceName: service.serviceName,
      metaDescription: service.metaDescription || service.shortDescription,
      metaKeywords: service.metaKeywords,
      canonicalUrl: service.canonicalUrl,
      ogImage: service.ogImage || service.featuredImage,
    },
    service.serviceName,
    appUrl
  );
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service || service.status !== "PUBLISHED") {
    notFound();
  }

  const faqs = (service.faqSection as any[]) || [];
  const cta = (service.ctaSection as Record<string, any>) || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Schema.org structured data block */}
      {service.schemaMarkup && Object.keys(service.schemaMarkup).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateSchemaScript(service.schemaMarkup)}
        />
      )}

      <div>
        {/* Header Hero Section */}
        <header className="relative py-24 px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-600/10 border border-violet-500/10 px-3 py-1 rounded-full">
              Finishing Service
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl font-serif text-white tracking-tight leading-tight">
              {service.serviceName}
            </h1>
            <p className="text-md sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              {service.shortDescription}
            </p>
          </div>
        </header>

        {/* Featured Image */}
        {service.featuredImage && (
          <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-8 relative z-10">
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={service.featuredImage}
                alt={service.serviceName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Detailed Service Content */}
        <main className="max-w-3xl mx-auto px-6 py-16 lg:px-8">
          <article
            className="prose prose-invert prose-violet text-slate-300 text-sm leading-relaxed max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: service.longDescription }}
          />

          {/* FAQs collapsibles section */}
          {faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-900 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-xl border border-slate-850 bg-slate-900/15 p-4 transition-all duration-200 open:bg-slate-900/40"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white list-none">
                      <span>{faq.question}</span>
                      <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                        ↓
                      </span>
                    </summary>
                    <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action layout section */}
          {Object.keys(cta).length > 0 && (cta.title || cta.description) && (
            <section className="mt-16 rounded-2xl bg-gradient-to-r from-violet-950/20 to-indigo-950/20 border border-slate-900 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2.5">
                {cta.title && (
                  <h3 className="text-xl font-serif font-bold text-white">{cta.title}</h3>
                )}
                {cta.description && (
                  <p className="text-xs text-slate-400 max-w-lg">{cta.description}</p>
                )}
              </div>
              {cta.linkText && cta.linkUrl && (
                <a
                  href={cta.linkUrl}
                  className="rounded-xl bg-white hover:bg-slate-105 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors shrink-0 shadow-md"
                >
                  {cta.linkText}
                </a>
              )}
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
