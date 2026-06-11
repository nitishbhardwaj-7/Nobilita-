import { z } from "zod";

// Admin & Editor login validation
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Dynamic sections/blocks inside a page
export const SectionBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["hero", "text", "features", "testimonials", "faq", "cta", "gallery", "rich-text"]),
  content: z.record(z.string(), z.any()),
});

// Custom Page input validation
export const PageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-_/]+$/, "Slug can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes"),
  pageType: z.string().default("CUSTOM"),
  heroTitle: z.string().optional().nullable(),
  heroDescription: z.string().optional().nullable(),
  sections: z.array(SectionBlockSchema).default([]),
  featuredImage: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

// Service item input validation
export const ServiceSchema = z.object({
  serviceName: z.string().min(2, "Service name must be at least 2 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-_]+$/, "Slug can only contain lowercase letters, numbers, hyphens, and underscores"),
  shortDescription: z.string().min(5, "Short description must be at least 5 characters"),
  longDescription: z.string().min(10, "Long description must be at least 10 characters"),
  featuredImage: z.string().optional().nullable(),
  galleryImages: z.array(z.string()).default([]),
  seoTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  canonicalUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  ogImage: z.string().optional().nullable(),
  schemaMarkup: z.record(z.string(), z.any()).default({}),
  faqSection: z
    .array(
      z.object({
        question: z.string().min(2, "Question is required"),
        answer: z.string().min(2, "Answer is required"),
      })
    )
    .default([]),
  ctaSection: z
    .object({
      title: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      linkText: z.string().optional().nullable(),
      linkUrl: z.string().optional().nullable(),
    })
    .default({}),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

// Global Site settings validation
export const SettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  logoUrl: z.string().optional().nullable(),
  contactEmail: z.string().email("Invalid contact email").optional().nullable().or(z.literal("")),
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
  trackingCode: z.string().optional().nullable(),
});
