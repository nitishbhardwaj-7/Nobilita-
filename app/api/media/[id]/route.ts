import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteFile } from "@/lib/upload";

// DELETE media asset
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media asset not found." },
        { status: 404 }
      );
    }

    // Try deleting from filesystem
    await deleteFile(media.fileUrl);

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Media asset deleted successfully." });
  } catch (error) {
    console.error("DELETE Media API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete media asset." },
      { status: 500 }
    );
  }
}
