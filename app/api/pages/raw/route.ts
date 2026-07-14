import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0; // Ensure fresh content

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug parameter", { status: 400 });
    }

    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page || !page.customHtml) {
      return new Response("Page not found or has no custom HTML", { status: 404 });
    }

    // Return the custom HTML with the proper content-type header
    return new Response(page.customHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("GET Raw Page HTML Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
