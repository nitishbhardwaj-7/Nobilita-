"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  pageType: string;
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-900" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-900" />
        </div>
        <div className="h-96 animate-pulse rounded-2xl bg-slate-900 border border-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Custom Pages</h2>
          <p className="text-sm text-slate-400">Manage structure, blocks, and visibility of custom layout pages.</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors self-start sm:self-auto shadow-lg shadow-violet-900/25"
        >
          <Plus size={16} />
          Create New Page
        </Link>
      </div>

      {error && (
        <div className="rounded-xl bg-red-950/40 border border-red-800 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {pages.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-12 text-center">
          <p className="text-slate-400 text-sm mb-4">No custom pages created yet.</p>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition-colors"
          >
            Create Your First Page
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">URL Slug</th>
                  <th className="px-6 py-4">Page Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{page.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">/{page.slug}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">{page.pageType}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          page.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        href={`/admin/pages/${page.id}`}
                        className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        title="Edit Page"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="inline-flex rounded-lg p-2 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 size={16} />
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
