import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SettingsSchema } from "@/lib/validation";

// GET global settings
export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    // Seed default settings if not exists
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: "global",
          siteName: "Porcellana Nobilita",
          logoUrl: "/logo.svg",
          contactEmail: "info@nobilita.com",
          contactPhone: "+39 02 1234567",
          footerText: "© 2026 Porcellana Nobilita. All rights reserved.",
          socialLinks: {
            facebook: "https://facebook.com/nobilita",
            instagram: "https://instagram.com/nobilita",
            twitter: "https://twitter.com/nobilita",
            linkedin: "https://linkedin.com/company/nobilita",
          },
        },
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("GET Settings API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings." },
      { status: 500 }
    );
  }
}

// PUT update global settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const validation = SettingsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    const updatedSettings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        siteName: data.siteName,
        logoUrl: data.logoUrl,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        footerText: data.footerText,
        socialLinks: data.socialLinks as any,
        trackingCode: data.trackingCode,
      },
      create: {
        id: "global",
        siteName: data.siteName,
        logoUrl: data.logoUrl,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        footerText: data.footerText,
        socialLinks: data.socialLinks as any,
        trackingCode: data.trackingCode,
      },
    });

    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    console.error("PUT Settings API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings." },
      { status: 500 }
    );
  }
}
