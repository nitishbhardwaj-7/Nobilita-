import React from "react";
import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0; // Ensure fresh data on every request

export default async function Home() {
  let cmsData = null;
  try {
    const page = await prisma.page.findFirst({
      where: { slug: "home" }
    });
    
    if (page && page.sections && Array.isArray(page.sections) && page.sections.length > 0) {
      // We store all homepage config inside the first element of sections
      cmsData = (page.sections as any)[0];
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <HomeClient cmsData={cmsData} />
  );
}
