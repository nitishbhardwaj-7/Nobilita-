import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ServiceSchema } from "@/lib/validation";

// GET single service by ID or Slug
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Search by id first, then slug
    const service = await prisma.service.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      }
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("GET Service API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch service." },
      { status: 500 }
    );
  }
}

// PUT update service
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const validation = ServiceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    // Verify slug uniqueness if changed
    if (data.slug !== service.slug) {
      const slugConflict = await prisma.service.findUnique({
        where: { slug: data.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { success: false, error: "A service with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updatedService });
  } catch (error) {
    console.error("PUT Service API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update service." },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Service deleted successfully." });
  } catch (error) {
    console.error("DELETE Service API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete service." },
      { status: 500 }
    );
  }
}
