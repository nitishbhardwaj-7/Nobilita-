"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown, Save } from "lucide-react";

interface SectionBlock {
  id: string;
  type: "hero" | "text" | "features" | "testimonials" | "faq" | "cta" | "gallery" | "rich-text";
  content: Record<string, any>;
}

export default function NewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"info" | "sections">("info");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Page Basic Info
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [pageType, setPageType] = useState("CUSTOM");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  // Page Blocks
  const [sections, setSections] = useState<SectionBlock[]>([]);

  const handleAddSection = (type: SectionBlock["type"]) => {
    const defaultContents: Record<SectionBlock["type"], Record<string, any>> = {
      hero: { title: "", subtitle: "", buttonText: "", buttonLink: "", bgImage: "" },
      text: { heading: "", subheading: "", body: "" },
      features: { title: "", items: [{ title: "", desc: "", icon: "" }] },
      testimonials: { title: "", list: [{ author: "", quote: "", role: "", avatar: "" }] },
      faq: { title: "", items: [{ question: "", answer: "" }] },
      cta: { title: "", text: "", btnText: "", btnLink: "" },
      gallery: { title: "", images: [""] },
      "rich-text": { html: "" },
    };

    const newSection: SectionBlock = {
      id: `sec_${Date.now()}`,
      type,
      content: defaultContents[type],
    };

    setSections([...sections, newSection]);
    setActiveTab("sections");
  };

  const handleUpdateSectionContent = (index: number, key: string, value: any) => {
    const updated = [...sections];
    updated[index].content[key] = value;
    setSections(updated);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          pageType,
          heroTitle: heroTitle || null,
          heroDescription: heroDescription || null,
          featuredImage: featuredImage || null,
          status,
          sections,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create page");
      }

      router.push("/admin/pages");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Create Page</h2>
            <p className="text-sm text-slate-400">Design a new custom landing page layout.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 shadow-lg shadow-violet-900/25"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save Page"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-950/40 border border-red-800 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Editor Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "info" ? "border-violet-500 text-white" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          1. General & Header Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sections")}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "sections" ? "border-violet-500 text-white" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          2. Content Blocks ({sections.length})
        </button>
      </div>

      {/* Tab 1: General Info */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/25 p-6">
            <h3 className="text-md font-serif font-bold text-white border-b border-slate-800 pb-3">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Page Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                  }}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none text-sm transition-all"
                  placeholder="e.g. Italian Marble Finishes"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Slug (URL Route)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none text-sm transition-all font-mono"
                  placeholder="e.g. finishes-marble"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none text-sm transition-all"
                  placeholder="e.g. /uploads/features/marble_header.jpg"
                />
              </div>
            </div>

            <h3 className="text-md font-serif font-bold text-white border-b border-slate-800 pb-3 pt-4">Hero Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Hero Section Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none text-sm transition-all"
                  placeholder="e.g. High Performance Porcelain Surfaces"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Hero Section Description</label>
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  rows={3}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none text-sm transition-all resize-none"
                  placeholder="Summarize the core layout value proposition..."
                />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Publishing Status</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStatus("DRAFT")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                    status === "DRAFT"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("PUBLISHED")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                    status === "PUBLISHED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  Published
                </button>
              </div>

              <div className="pt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Page Type Layout</label>
                <select
                  value={pageType}
                  onChange={(e) => setPageType(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all"
                >
                  <option value="CUSTOM">Custom Content Blocks</option>
                  <option value="HOME">Homepage Structure</option>
                  <option value="ABOUT">Corporate About Us</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Quick Tips</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Slugs are the paths that map the URL (e.g. `marble-finishes` creates `http://site.com/marble-finishes`). Ensure slugs use hyphen separators and do not contain special characters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sections Builder */}
      {activeTab === "sections" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Blocks selector menu */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/25 p-4 space-y-3 h-fit sticky top-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">Available Blocks</h4>
            {[
              { type: "hero", label: "Hero Banner" },
              { type: "text", label: "Heading & Text" },
              { type: "features", label: "Features Grid" },
              { type: "testimonials", label: "Testimonials" },
              { type: "faq", label: "FAQ Listing" },
              { type: "cta", label: "Call to Action" },
              { type: "gallery", label: "Images Grid" },
              { type: "rich-text", label: "HTML / Rich Text" },
            ].map((btn) => (
              <button
                key={btn.type}
                type="button"
                onClick={() => handleAddSection(btn.type as any)}
                className="flex w-full items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-violet-500/30 px-4 py-2.5 text-xs font-medium text-slate-300 transition-all text-left"
              >
                <Plus size={14} className="text-violet-400" />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Blocks layout list */}
          <div className="lg:col-span-3 space-y-6">
            {sections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
                <p className="text-slate-500 text-sm mb-4">No content blocks added yet. Choose a block from the panel to compose your page.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section, idx) => (
                  <div key={section.id} className="rounded-2xl border border-slate-800 bg-slate-900/20 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-slate-900/40 border-b border-slate-800/80 px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                        <span className="text-xs font-extrabold uppercase tracking-wider bg-violet-600/10 text-violet-400 border border-violet-500/10 px-2 py-0.5 rounded">
                          {section.type}
                        </span>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleMoveSection(idx, "up")}
                          disabled={idx === 0}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection(idx, "down")}
                          disabled={idx === sections.length - 1}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Section field configuration inputs */}
                    <div className="p-5 space-y-4 bg-slate-950/20">
                      {section.type === "hero" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Title</label>
                            <input
                              type="text"
                              value={section.content.title}
                              onChange={(e) => handleUpdateSectionContent(idx, "title", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Subtitle</label>
                            <input
                              type="text"
                              value={section.content.subtitle}
                              onChange={(e) => handleUpdateSectionContent(idx, "subtitle", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Button Text</label>
                            <input
                              type="text"
                              value={section.content.buttonText}
                              onChange={(e) => handleUpdateSectionContent(idx, "buttonText", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Button Link</label>
                            <input
                              type="text"
                              value={section.content.buttonLink}
                              onChange={(e) => handleUpdateSectionContent(idx, "buttonLink", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </div>
                      )}

                      {section.type === "text" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Heading</label>
                            <input
                              type="text"
                              value={section.content.heading}
                              onChange={(e) => handleUpdateSectionContent(idx, "heading", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Subheading</label>
                            <input
                              type="text"
                              value={section.content.subheading}
                              onChange={(e) => handleUpdateSectionContent(idx, "subheading", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Body Description</label>
                            <textarea
                              value={section.content.body}
                              onChange={(e) => handleUpdateSectionContent(idx, "body", e.target.value)}
                              rows={4}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white resize-none"
                            />
                          </div>
                        </div>
                      )}

                      {section.type === "cta" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">CTA Title</label>
                            <input
                              type="text"
                              value={section.content.title}
                              onChange={(e) => handleUpdateSectionContent(idx, "title", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Description Text</label>
                            <textarea
                              value={section.content.text}
                              onChange={(e) => handleUpdateSectionContent(idx, "text", e.target.value)}
                              rows={2}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Button Label</label>
                            <input
                              type="text"
                              value={section.content.btnText}
                              onChange={(e) => handleUpdateSectionContent(idx, "btnText", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500">Button Link</label>
                            <input
                              type="text"
                              value={section.content.btnLink}
                              onChange={(e) => handleUpdateSectionContent(idx, "btnLink", e.target.value)}
                              className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {section.type === "rich-text" && (
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500">Rich HTML Content</label>
                          <textarea
                            value={section.content.html}
                            onChange={(e) => handleUpdateSectionContent(idx, "html", e.target.value)}
                            rows={8}
                            className="mt-1 block w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white font-mono"
                            placeholder="<p>Write your custom page content here...</p>"
                          />
                        </div>
                      )}

                      {["features", "testimonials", "faq", "gallery"].includes(section.type) && (
                        <p className="text-xs text-slate-400 italic">
                          This block is fully configured via structure nodes. Default content will render. Configure arrays using json variables in final schemas.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
