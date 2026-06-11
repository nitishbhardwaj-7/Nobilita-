import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ServiceSchema } from "@/lib/validation";

// GET all services
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("GET Services API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services." },
      { status: 500 }
    );
  }
}

// POST create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ServiceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check slug uniqueness
    const existingService = await prisma.service.findUnique({
      where: { slug: data.slug },
    });

    if (existingService) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    const newService = await prisma.service.create({
      data: {
        serviceName: data.serviceName,
        slug: data.slug,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        featuredImage: data.featuredImage,
        galleryImages: data.galleryImages as any,
        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        canonicalUrl: data.canonicalUrl,
        ogImage: data.ogImage,
        schemaMarkup: data.schemaMarkup as any,
        faqSection: data.faqSection as any,
        ctaSection: data.ctaSection as any,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("POST Service API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create service." },
      { status: 500 }
    );
  }
}
