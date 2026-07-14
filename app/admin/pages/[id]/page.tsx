"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown, Save, ChevronDown } from "lucide-react";

interface SectionBlock {
  id: string;
  type: "hero" | "text" | "features" | "testimonials" | "faq" | "cta" | "gallery" | "rich-text";
  content: Record<string, any>;
}

function CustomSelect({
  value,
  onChange,
  options,
  style,
  className = "",
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  style?: React.CSSProperties;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border border-[#1a1a1a]/15 bg-white px-4 py-3 text-xs text-[#1a1a1a] hover:border-[#1a1a1a]/40 transition-colors focus:outline-none"
      >
        <span className="tracking-[0.1em] uppercase font-semibold text-left">{selectedOption?.label}</span>
        <ChevronDown size={14} className={`text-[#1a1a1a]/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 border border-[#1a1a1a]/10 bg-white shadow-lg py-1 max-h-60 overflow-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`flex w-full px-4 py-2.5 text-left text-xs tracking-[0.1em] uppercase font-semibold transition-colors ${
                opt.value === value
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState<"info" | "sections">("info");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Page Basic Info
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [pageType, setPageType] = useState("CUSTOM");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [customHtml, setCustomHtml] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  // Page Blocks
  const [sections, setSections] = useState<SectionBlock[]>([]);

  useEffect(() => {
    async function fetchPageDetails() {
      try {
        const res = await fetch(`/api/pages/${id}`);
        if (!res.ok) throw new Error("Failed to load page data");
        const data = await res.json();
        const page = data.data;

        setTitle(page.title);
        setSlug(page.slug);
        setPageType(page.pageType);
        setHeroTitle(page.heroTitle || "");
        setHeroDescription(page.heroDescription || "");
        setFeaturedImage(page.featuredImage || "");
        setCustomHtml(page.customHtml || "");
        setStatus(page.status as "DRAFT" | "PUBLISHED");
        setSections(page.sections || []);
      } catch (err: any) {
        setError(err.message || "Failed to load page");
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchPageDetails();
  }, [id]);

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
      const res = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          pageType,
          heroTitle: heroTitle || null,
          heroDescription: heroDescription || null,
          featuredImage: featuredImage || null,
          status,
          sections: pageType === "PASTED_HTML" ? [] : sections,
          customHtml: pageType === "PASTED_HTML" ? customHtml : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update page");
      }

      router.push("/admin/pages");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const fontMichroma = { fontFamily: "var(--font-michroma), sans-serif" };
  const fontIvymode = { fontFamily: "var(--font-ivymode), serif" };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center bg-white text-[#1a1a1a]" style={fontMichroma}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-6 w-6 animate-spin rounded-full border border-[#1a1a1a]/20 border-t-[#1a1a1a]" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/60">Fetching details...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="flex items-center justify-center w-10 h-10 border border-[#1a1a1a]/8 text-[#1a1a1a]/40 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#1a1a1a]/35 mb-1" style={fontMichroma}>
              Nobilita Content Studio
            </p>
            <h2 className="text-3xl font-light text-[#1a1a1a] leading-tight" style={fontIvymode}>
              Edit Page
            </h2>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] px-6 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-white transition-all duration-200 shadow-sm"
          style={fontMichroma}
        >
          <Save size={13} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1a1a1a]/8" />

      {error && (
        <div className="border-l-2 border-red-500 bg-red-500/5 p-4 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Editor Tabs */}
      <div className="flex border-b border-[#1a1a1a]/8">
        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className={`px-5 py-3 text-[10px] tracking-[0.15em] uppercase font-semibold border-b-2 transition-all ${
            activeTab === "info"
              ? "border-[#1a1a1a] text-[#1a1a1a]"
              : "border-transparent text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
          }`}
          style={fontMichroma}
        >
          1. General & Header Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sections")}
          className={`px-5 py-3 text-[10px] tracking-[0.15em] uppercase font-semibold border-b-2 transition-all ${
            activeTab === "sections"
              ? "border-[#1a1a1a] text-[#1a1a1a]"
              : "border-transparent text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
          }`}
          style={fontMichroma}
        >
          {pageType === "PASTED_HTML" ? "2. Paste Website HTML" : `2. Content Blocks (${sections.length})`}
        </button>
      </div>

      {/* Tab 1: General Info */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6 border border-[#1a1a1a]/8 bg-white p-8">
            <h3 className="text-md font-light text-[#1a1a1a] border-b border-[#1a1a1a]/8 pb-3" style={fontIvymode}>Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Page Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-sm transition-all"
                  placeholder="e.g. Italian Marble Finishes"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Slug (URL Route)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-sm font-mono transition-all"
                  placeholder="e.g. finishes-marble"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-sm transition-all"
                  placeholder="e.g. /uploads/features/marble_header.jpg"
                />
              </div>
            </div>

            <h3 className="text-md font-light text-[#1a1a1a] border-b border-[#1a1a1a]/8 pb-3 pt-4" style={fontIvymode}>Hero Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Hero Section Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-sm transition-all"
                  placeholder="e.g. High Performance Porcelain Surfaces"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Hero Section Description</label>
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  rows={3}
                  className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-sm transition-all resize-none"
                  placeholder="Summarize the core layout value proposition..."
                />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="border border-[#1a1a1a]/8 bg-white p-6 space-y-5">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/60 font-semibold" style={fontMichroma}>Publishing Status</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStatus("DRAFT")}
                  className={`flex-1 px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-semibold border transition-all ${
                    status === "DRAFT"
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-transparent border-[#1a1a1a]/10 text-[#1a1a1a]/40 hover:border-[#1a1a1a]/30"
                  }`}
                  style={fontMichroma}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("PUBLISHED")}
                  className={`flex-1 px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-semibold border transition-all ${
                    status === "PUBLISHED"
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-transparent border-[#1a1a1a]/10 text-[#1a1a1a]/40 hover:border-[#1a1a1a]/30"
                  }`}
                  style={fontMichroma}
                >
                  Published
                </button>
              </div>

              <div className="pt-4">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>Page Type Layout</label>
                <CustomSelect
                  value={pageType}
                  onChange={(val) => setPageType(val)}
                  options={[
                    { value: "CUSTOM", label: "Custom Content Blocks" },
                    { value: "HOME", label: "Homepage Structure" },
                    { value: "ABOUT", label: "Corporate About Us" },
                    { value: "PASTED_HTML", label: "Pasted Raw HTML (Whole Website)" },
                  ]}
                  style={fontMichroma}
                  className="w-full"
                />
              </div>
            </div>

            <div className="border border-[#1a1a1a]/8 bg-white p-6 space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/60 font-semibold" style={fontMichroma}>Quick Tips</h3>
              <p className="text-xs text-[#8b8b8b] leading-relaxed">
                Slugs are the paths that map the URL (e.g. `marble-finishes` creates `http://site.com/marble-finishes`). Ensure slugs use hyphen separators and do not contain special characters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sections Builder */}
      {activeTab === "sections" && (
        pageType === "PASTED_HTML" ? (
          <div className="space-y-4 border border-[#1a1a1a]/8 bg-white p-8">
            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2" style={fontMichroma}>
                Paste HTML Code here *
              </label>
              <textarea
                required={pageType === "PASTED_HTML"}
                value={customHtml}
                onChange={(e) => setCustomHtml(e.target.value)}
                rows={25}
                className="block w-full border border-[#1a1a1a]/15 bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none text-xs transition-all font-mono leading-relaxed"
                placeholder="<!DOCTYPE html><html><head>...</head><body>...</body></html>"
              />
            </div>
            <p className="text-xs text-[#8b8b8b] leading-relaxed">
              Paste the complete, raw HTML of the website/page. All scripts, fonts, stylesheets, and custom designs within the pasted HTML will render inside an isolated sandboxed viewport, keeping your designs fully dynamic and clean.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Blocks selector menu */}
            <div className="lg:col-span-1 border border-[#1a1a1a]/8 bg-white p-4 space-y-3 h-fit sticky top-6">
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/40 px-2 mb-2 font-semibold" style={fontMichroma}>Available Blocks</h4>
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
                  className="flex w-full items-center gap-2 border border-[#1a1a1a]/10 bg-white hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white px-4 py-2.5 text-[10px] tracking-[0.1em] uppercase font-semibold text-[#1a1a1a]/70 transition-all text-left"
                  style={fontMichroma}
                >
                  <Plus size={12} />
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Blocks layout list */}
            <div className="lg:col-span-3 space-y-6">
              {sections.length === 0 ? (
                <div className="border border-dashed border-[#1a1a1a]/20 bg-white p-12 text-center">
                  <p className="text-[#8b8b8b] text-sm font-light">No content blocks added yet. Choose a block from the panel to compose your page.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sections.map((section, idx) => (
                    <div key={section.id} className="border border-[#1a1a1a]/8 bg-white overflow-hidden shadow-sm transition-all">
                      {/* Header */}
                      <div className="flex items-center justify-between bg-[#1a1a1a]/[0.015] border-b border-[#1a1a1a]/8 px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono text-[#1a1a1a]/40">#{idx + 1}</span>
                          <span
                            className="text-[9px] tracking-[0.2em] uppercase font-bold bg-[#1a1a1a]/5 text-[#1a1a1a]/70 border border-[#1a1a1a]/8 px-2 py-0.5"
                            style={fontMichroma}
                          >
                            {section.type}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/40 hover:text-[#1a1a1a] disabled:opacity-20 transition-colors"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, "down")}
                            disabled={idx === sections.length - 1}
                            className="p-1.5 hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/40 hover:text-[#1a1a1a] disabled:opacity-20 transition-colors"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                            className="p-1.5 hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Section field configuration inputs */}
                      <div className="p-6 space-y-4 bg-white">
                        {section.type === "hero" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Title</label>
                              <input
                                type="text"
                                value={section.content.title}
                                onChange={(e) => handleUpdateSectionContent(idx, "title", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Subtitle</label>
                              <input
                                type="text"
                                value={section.content.subtitle}
                                onChange={(e) => handleUpdateSectionContent(idx, "subtitle", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Button Text</label>
                              <input
                                type="text"
                                value={section.content.buttonText}
                                onChange={(e) => handleUpdateSectionContent(idx, "buttonText", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Button Link</label>
                              <input
                                type="text"
                                value={section.content.buttonLink}
                                onChange={(e) => handleUpdateSectionContent(idx, "buttonLink", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                          </div>
                        )}

                        {section.type === "text" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Heading</label>
                              <input
                                type="text"
                                value={section.content.heading}
                                onChange={(e) => handleUpdateSectionContent(idx, "heading", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Subheading</label>
                              <input
                                type="text"
                                value={section.content.subheading}
                                onChange={(e) => handleUpdateSectionContent(idx, "subheading", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Body Description</label>
                              <textarea
                                value={section.content.body}
                                onChange={(e) => handleUpdateSectionContent(idx, "body", e.target.value)}
                                rows={4}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all resize-none"
                              />
                            </div>
                          </div>
                        )}

                        {section.type === "cta" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>CTA Title</label>
                              <input
                                type="text"
                                value={section.content.title}
                                onChange={(e) => handleUpdateSectionContent(idx, "title", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Description Text</label>
                              <textarea
                                value={section.content.text}
                                onChange={(e) => handleUpdateSectionContent(idx, "text", e.target.value)}
                                rows={2}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all resize-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Button Label</label>
                              <input
                                type="text"
                                value={section.content.btnText}
                                onChange={(e) => handleUpdateSectionContent(idx, "btnText", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Button Link</label>
                              <input
                                type="text"
                                value={section.content.btnLink}
                                onChange={(e) => handleUpdateSectionContent(idx, "btnLink", e.target.value)}
                                className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {section.type === "rich-text" && (
                          <div>
                            <label className="block text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-1" style={fontMichroma}>Rich HTML Content</label>
                            <textarea
                              value={section.content.html}
                              onChange={(e) => handleUpdateSectionContent(idx, "html", e.target.value)}
                              rows={8}
                              className="block w-full border border-[#1a1a1a]/15 bg-white px-3 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:border-[#1a1a1a] focus:outline-none transition-all font-mono"
                              placeholder="<p>Write your custom page content here...</p>"
                            />
                          </div>
                        )}

                        {["features", "testimonials", "faq", "gallery"].includes(section.type) && (
                          <p className="text-xs text-[#8b8b8b] italic">
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
        )
      )}
    </form>
  );
}
