import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Application } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { jobId } }: { params: { jobId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorised access" },
        { status: 401 }
      );
    }
    if (user.role !== "RECRUITER") {
      return NextResponse.json(
        { error: "Forbidden server action" },
        { status: 401 }
      );
    }

    const application = await db.application.findMany({
      where: {
        jobId: jobId,
      },
      include: {
        user: true,
        job: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Job application not found" },
        { status: 404 }
      );
    }

    const data: Application = {
      userId: user.id!,
      jobId: jobId,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
