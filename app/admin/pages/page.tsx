"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  customHtml?: string | null;
  status: string;
  updatedAt: string;
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const res = await fetch("/api/pages");
      if (!res.ok) throw new Error("Failed to fetch pages");
      const data = await res.json();
      setPages(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this page? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete page");
      }

      setPages(pages.filter((page) => page.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const fontMichroma = { fontFamily: "var(--font-michroma), sans-serif" };
  const fontIvymode = { fontFamily: "var(--font-ivymode), serif" };

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse bg-[#1a1a1a]/5" />
            <div className="h-8 w-48 animate-pulse bg-[#1a1a1a]/5" />
          </div>
          <div className="h-12 w-40 animate-pulse bg-[#1a1a1a]/5" />
        </div>
        <div className="h-96 animate-pulse bg-white border border-[#1a1a1a]/8" />
      </div>
    );
  }

  return (
    <div className="space-y-10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/35 mb-2" style={fontMichroma}>
            Nobilita Content Studio
          </p>
          <h2 className="text-3xl font-light text-[#1a1a1a] leading-tight" style={fontIvymode}>
            Custom Pages
          </h2>
          <p className="mt-2 text-sm text-[#8b8b8b]">
            Manage structure, blocks, and visibility of custom layout pages.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="flex items-center justify-center gap-2 border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] px-6 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-white transition-all duration-200 self-start sm:self-auto shadow-sm"
          style={fontMichroma}
        >
          <Plus size={13} />
          Create New Page
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1a1a1a]/8" />

      {error && (
        <div className="border-l-2 border-red-500 bg-red-500/5 p-4 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {pages.length === 0 ? (
        <div className="border border-[#1a1a1a]/8 bg-white p-16 text-center space-y-6">
          <p className="text-[#8b8b8b] text-sm font-light">No custom pages created yet.</p>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-5 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1a1a1a] transition-all duration-200"
            style={fontMichroma}
          >
            Create Your First Page
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#1a1a1a]/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[#1a1a1a]/80">
              <thead className="border-b border-[#1a1a1a]/8 bg-white text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/40 font-semibold" style={fontMichroma}>
                <tr>
                  <th className="px-6 py-4.5 font-semibold">Title</th>
                  <th className="px-6 py-4.5 font-semibold">URL Slug</th>
                  <th className="px-6 py-4.5 font-semibold">Page Type</th>
                  <th className="px-6 py-4.5 font-semibold">Status</th>
                  <th className="px-6 py-4.5 font-semibold">Last Updated</th>
                  <th className="px-6 py-4.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]/6">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-[#1a1a1a]/[0.015] transition-colors">
                    <td className="px-6 py-5 font-medium text-[#1a1a1a]" style={{ fontSize: "13px" }}>{page.title}</td>
                    <td className="px-6 py-5 font-mono text-xs text-[#8b8b8b]">/{page.slug}</td>
                    <td className="px-6 py-5 text-[10px] tracking-[0.15em] uppercase text-[#8b8b8b]" style={fontMichroma}>
                      {page.slug === "home" || page.slug === "" ? "Home Page" : page.customHtml ? "Pasted HTML" : "Standard Section"}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] tracking-[0.15em] uppercase font-semibold ${
                          page.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : "bg-amber-50 text-amber-700 border border-amber-200/50"
                        }`}
                        style={fontMichroma}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${page.status === "PUBLISHED" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs text-[#8b8b8b]">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 text-right space-x-1.5">
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center w-8 h-8 border border-[#1a1a1a]/8 text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20 transition-all"
                        title="View Live Page"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <Link
                        href={`/admin/pages/${page.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 border border-[#1a1a1a]/8 text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20 transition-all"
                        title="Edit Page"
                      >
                        <Edit2 size={13} />
                      </Link>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="inline-flex items-center justify-center w-8 h-8 border border-[#1a1a1a]/8 text-red-400 hover:text-red-600 hover:border-red-200 transition-all"
                        title="Delete Page"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
