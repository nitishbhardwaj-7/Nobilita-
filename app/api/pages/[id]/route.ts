import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PageSchema } from "@/lib/validation";

// GET single page by ID or Slug
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Search by id first, then slug
    const page = await prisma.page.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      }
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("GET Page API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch page." },
      { status: 500 }
    );
  }
}

// PUT update page
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const validation = PageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Verify page exists
    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found." },
        { status: 404 }
      );
    }

    // Verify slug uniqueness if changed
    if (data.slug !== page.slug) {
      const slugConflict = await prisma.page.findUnique({
        where: { slug: data.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { success: false, error: "A page with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updatedPage = await prisma.page.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error("PUT Page API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update page." },
      { status: 500 }
    );
  }
}

// DELETE page
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found." },
        { status: 404 }
      );
    }

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Page deleted successfully." });
  } catch (error) {
    console.error("DELETE Page API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete page." },
      { status: 500 }
    );
  }
}
