"use client";

import React, { useState, useEffect } from "react";
import { Save, Check } from "lucide-react";

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [footerText, setFooterText] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  // Social Links
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        const settings = data.data;

        if (settings) {
          setSiteName(settings.siteName || "");
          setLogoUrl(settings.logoUrl || "");
          setContactEmail(settings.contactEmail || "");
          setContactPhone(settings.contactPhone || "");
          setFooterText(settings.footerText || "");
          setTrackingCode(settings.trackingCode || "");

          const socials = settings.socialLinks || {};
          setFacebook(socials.facebook || "");
          setInstagram(socials.instagram || "");
          setTwitter(socials.twitter || "");
          setLinkedin(socials.linkedin || "");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load site settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          logoUrl,
          contactEmail,
          contactPhone,
          footerText,
          trackingCode,
          socialLinks: {
            facebook,
            instagram,
            twitter,
            linkedin,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update settings");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-slate-400 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Global Site Settings</h2>
          <p className="text-sm text-slate-400">Configure global metadata details, social graphs, and tracking code parameters.</p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 shadow-lg shadow-violet-900/25"
        >
          {success ? (
            <>
              <Check size={16} className="text-emerald-300" />
              Settings Updated
            </>
          ) : (
            <>
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Settings"}
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-950/40 border border-red-800 p-4 text-sm text-red-400 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* General Brand Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6 space-y-4">
            <h3 className="text-md font-serif font-bold text-white border-b border-slate-800 pb-3">Brand Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Website Name</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Corporate Brand Logo URL</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Footer Copyright Text</label>
              <textarea
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                rows={2}
                className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all resize-none"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6 space-y-4">
            <h3 className="text-md font-serif font-bold text-white border-b border-slate-800 pb-3">Corporate Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Support Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Office Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="block w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-white focus:border-violet-500 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns */}
        <div className="space-y-6">
          {/* Social Profiles */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-2">Social Networks</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="block w-full rounded bg-slate-950/60 border border-slate-850 p-2 text-xs text-white"
                  placeholder="https://facebook.com/brand"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="block w-full rounded bg-slate-950/60 border border-slate-850 p-2 text-xs text-white"
                  placeholder="https://instagram.com/brand"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Twitter URL</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="block w-full rounded bg-slate-950/60 border border-slate-850 p-2 text-xs text-white"
                  placeholder="https://twitter.com/brand"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="block w-full rounded bg-slate-950/60 border border-slate-850 p-2 text-xs text-white"
                  placeholder="https://linkedin.com/brand"
                />
              </div>
            </div>
          </div>

          {/* Third Party Embeds */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6 space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Header Custom HTML Code</h3>
            <textarea
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              rows={4}
              className="block w-full rounded-lg border border-slate-850 bg-slate-950/60 p-3 text-xs text-white font-mono"
              placeholder="<!-- Google Tag Manager / Analytics / Pixels script -->"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
