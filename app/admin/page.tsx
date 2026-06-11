"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Briefcase, Image as ImageIcon, Settings, Plus, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pagesCount: 0,
    servicesCount: 0,
    mediaCount: 0,
    publishedPages: 0,
    publishedServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pagesRes, servicesRes, mediaRes] = await Promise.all([
          fetch("/api/pages"),
          fetch("/api/services"),
          fetch("/api/media"),
        ]);

        const pagesData = pagesRes.ok ? await pagesRes.json() : { data: [] };
        const servicesData = servicesRes.ok ? await servicesRes.json() : { data: [] };
        const mediaData = mediaRes.ok ? await mediaRes.json() : { data: [] };

        const pages = pagesData.data || [];
        const services = servicesData.data || [];
        const media = mediaData.data || [];

        setStats({
          pagesCount: pages.length,
          servicesCount: services.length,
          mediaCount: media.length,
          publishedPages: pages.filter((p: any) => p.status === "PUBLISHED").length,
          publishedServices: services.filter((s: any) => s.status === "PUBLISHED").length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 animate-pulse rounded-2xl bg-slate-900 border border-slate-800" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-slate-900 border border-slate-800" />
      </div>
    );
  }

  const cards = [
    {
      name: "Custom Pages",
      count: stats.pagesCount,
      detail: `${stats.publishedPages} Published / ${stats.pagesCount - stats.publishedPages} Drafts`,
      link: "/admin/pages",
      icon: FileText,
      color: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30",
    },
    {
      name: "Services Pages",
      count: stats.servicesCount,
      detail: `${stats.publishedServices} Published / ${stats.servicesCount - stats.publishedServices} Drafts`,
      link: "/admin/services",
      icon: Briefcase,
      color: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30",
    },
    {
      name: "Media Assets",
      count: stats.mediaCount,
      detail: "Uploaded images & documents",
      link: "/admin/media",
      icon: ImageIcon,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 lg:p-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-2">
          <h2 className="text-xl font-bold text-white sm:text-2xl font-serif">Welcome back to Nobilita Portal</h2>
          <p className="text-sm text-slate-400">
            Create pages, update your services descriptions, upload media assets, and customize meta tags to optimize your site for Google search engines.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.name}
              className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.color} p-6 shadow-md transition-all duration-300 hover:scale-[1.01]`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{card.name}</p>
                  <h3 className="text-4xl font-extrabold text-white tracking-tight">{card.count}</h3>
                  <p className="text-xs text-slate-400">{card.detail}</p>
                </div>
                <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
                  <Icon size={24} />
                </div>
              </div>
              <Link
                href={card.link}
                className="mt-6 flex items-center justify-center gap-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 px-4 py-2 text-xs font-semibold text-white border border-slate-800 transition-colors"
              >
                Manage Items
                <ArrowUpRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/pages/new"
              className="flex items-center justify-between rounded-xl border border-slate-800 hover:border-violet-500/50 bg-slate-900/50 hover:bg-slate-900 p-4 transition-all group"
            >
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Create Page</span>
              <div className="rounded-lg bg-violet-600/10 text-violet-400 p-2 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Plus size={16} />
              </div>
            </Link>

            <Link
              href="/admin/services/new"
              className="flex items-center justify-between rounded-xl border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 hover:bg-slate-900 p-4 transition-all group"
            >
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Add Service</span>
              <div className="rounded-lg bg-indigo-600/10 text-indigo-400 p-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Plus size={16} />
              </div>
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center justify-between rounded-xl border border-slate-800 hover:border-emerald-500/50 bg-slate-900/50 hover:bg-slate-900 p-4 transition-all group col-span-1 sm:col-span-2"
            >
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Upload Media</span>
              <div className="rounded-lg bg-emerald-600/10 text-emerald-400 p-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Plus size={16} />
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Settings Configuration</h3>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between h-[132px]">
            <p className="text-xs text-slate-400">
              Configure global parameters like page title suffix, corporate contact phone, logos, footer copyrights, and SEO trackers.
            </p>
            <Link
              href="/admin/settings"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white border border-slate-800 transition-colors"
            >
              <Settings size={14} />
              Open Site Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
