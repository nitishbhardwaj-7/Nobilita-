"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2, Copy, Check, FolderOpen } from "lucide-react";

interface MediaFile {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  folder: string;
  createdAt: string;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Folder selector
  const [currentFolder, setCurrentFolder] = useState("general");
  
  // Upload states
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [currentFolder]);

  async function fetchMedia() {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?folder=/${currentFolder}`);
      if (!res.ok) throw new Error("Failed to load media files.");
      const data = await res.json();
      setMedia(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("folder", currentFolder);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload file");
      }

      setMedia([data.data, ...media]);
    } catch (err: any) {
      setError(err.message || "File upload failed.");
    } finally {
      setUploading(false);
      // Reset input value
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this media asset from disk? All page references will break.")) return;

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete file");
      }

      setMedia(media.filter((file) => file.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCopyLink = (file: MediaFile) => {
    navigator.clipboard.writeText(file.fileUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Media Library</h2>
          <p className="text-sm text-slate-400">Upload, organize, and copy paths of images and assets for your pages.</p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer shadow-lg shadow-violet-900/25">
          <Upload size={16} />
          {uploading ? "Uploading..." : "Upload Asset"}
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            disabled={uploading}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {error && (
        <div className="rounded-xl bg-red-950/40 border border-red-800 p-4 text-sm text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Directory Folder Selector */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/10 p-4">
        <FolderOpen size={18} className="text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2">Folder:</span>
        <div className="flex gap-2">
          {["general", "services", "pages"].map((folder) => (
            <button
              key={folder}
              onClick={() => setCurrentFolder(folder)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize border transition-all ${
                currentFolder === folder
                  ? "bg-violet-600/10 text-violet-400 border-violet-500/40"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-48 animate-pulse rounded-2xl bg-slate-900 border border-slate-800" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-16 text-center">
          <p className="text-slate-400 text-sm">No files uploaded in folder "/{currentFolder}" yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((file) => (
            <div
              key={file.id}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/20 overflow-hidden flex flex-col justify-between transition-all hover:border-slate-700 hover:bg-slate-900/40"
            >
              {/* Image Preview */}
              <div className="aspect-square bg-slate-950/60 relative overflow-hidden flex items-center justify-center border-b border-slate-850">
                {file.fileType.startsWith("image/") ? (
                  <img
                    src={file.fileUrl}
                    alt={file.fileName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Document</span>
                )}
                
                {/* Float Delete Button */}
                <button
                  onClick={() => handleDelete(file.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-red-950/90 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-800"
                  title="Delete File"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Description Details */}
              <div className="p-3 space-y-1">
                <p className="truncate text-xs font-semibold text-white" title={file.fileName}>
                  {file.fileName}
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>{formatBytes(file.fileSize)}</span>
                  <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-slate-850 p-2 bg-slate-900/30">
                <button
                  onClick={() => handleCopyLink(file)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-950/65 hover:bg-slate-950 text-slate-300 hover:text-white px-2 py-1.5 text-xs font-medium border border-slate-800 transition-all"
                >
                  {copiedId === file.id ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy URL Path
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
