import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PageSchema } from "@/lib/validation";

// GET all pages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // DRAFT or PUBLISHED

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const pages = await prisma.page.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("GET Pages API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pages." },
      { status: 500 }
    );
  }
}

// POST create a new page
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = PageSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.issues[0].message },
          { status: 400 }
        );
      }

    const data = validation.data;

    // Check if slug is unique
    const existingPage = await prisma.page.findUnique({
      where: { slug: data.slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { success: false, error: "A page with this slug already exists." },
        { status: 409 }
      );
    }

    const newPage = await prisma.page.create({
      data: {
        title: data.title,
        slug: data.slug,
        pageType: data.pageType,
        heroTitle: data.heroTitle,
        heroDescription: data.heroDescription,
        sections: data.sections as any,
        featuredImage: data.featuredImage,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch (error) {
    console.error("POST Page API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create page." },
      { status: 500 }
    );
  }
}
