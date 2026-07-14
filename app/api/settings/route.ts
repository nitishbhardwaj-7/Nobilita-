import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET global settings
export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: "global",
          siteName: "Porcellana Nobilita",
          contactEmail: "info@nobilita.com",
          contactPhone: "+39 02 1234567",
          footerText: "© 2026 Porcellana Nobilita. All rights reserved.",
          socialLinks: {
            instagram: "",
            facebook: "",
            linkedin: "",
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
    const {
      siteName,
      logoLight,
      logoDark,
      contactEmail,
      contactPhone,
      footerText,
      socialLinks,
      seoTitle,
      seoDescription,
    } = body;

    const updatedSettings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        ...(siteName !== undefined && { siteName }),
        ...(logoLight !== undefined && { logoLight }),
        ...(logoDark !== undefined && { logoDark }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(footerText !== undefined && { footerText }),
        ...(socialLinks !== undefined && { socialLinks }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
      },
      create: {
        id: "global",
        siteName: siteName || "Porcellana Nobilita",
        logoLight: logoLight || null,
        logoDark: logoDark || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        footerText: footerText || null,
        socialLinks: socialLinks || {},
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
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
