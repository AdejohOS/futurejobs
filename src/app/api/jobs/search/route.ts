import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    const jobs = await db.job.findMany({
      where: {
        OR: [
          { title: { contains: q.toLowerCase() } },
          { location: { contains: q.toLowerCase() } },
          { content: { contains: q.toLowerCase() } },
        ],
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
