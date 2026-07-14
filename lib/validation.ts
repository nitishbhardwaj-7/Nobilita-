import { z } from "zod";

// Admin login validation
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Dynamic section block schema (flexible per-type content)
export const SectionBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  content: z.record(z.string(), z.any()),
});

// Page validation
export const PageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-_/]+$/,
      "Slug can only contain lowercase letters, numbers, hyphens, underscores, and slashes"
    ),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  sections: z.array(SectionBlockSchema).default([]),
  customHtml: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

// Product / Slab validation
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional().nullable(),
  finish: z.string().optional().nullable(),
  thicknessMm: z.array(z.string()).default([]),
  dimensions: z.array(z.string()).default([]),
  format: z.string().optional().nullable(),
  applications: z.array(z.string()).default([]),
  coverImage: z.string().optional().nullable(),
  gallery: z.array(z.string()).default([]),
  order: z.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

// Global site settings validation
export const SettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required").optional(),
  logoLight: z.string().optional().nullable(),
  logoDark: z.string().optional().nullable(),
  contactEmail: z
    .string()
    .email("Invalid email")
    .optional()
    .nullable()
    .or(z.literal("")),
  contactPhone: z.string().optional().nullable(),
  footerText: z.string().optional().nullable(),
  socialLinks: z
    .object({
      facebook: z.string().optional().nullable(),
      instagram: z.string().optional().nullable(),
      twitter: z.string().optional().nullable(),
      linkedin: z.string().optional().nullable(),
    })
    .default({}),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});
