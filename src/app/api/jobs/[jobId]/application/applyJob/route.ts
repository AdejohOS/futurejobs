import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ApplicationInfo } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { jobId } }: { params: { jobId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json("Unauthorised access", { status: 401 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
      select: {
        applications: {
          where: {
            userId: user.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json("Job not found", { status: 404 });
    }

    const data: ApplicationInfo = {
      hasUserApplied: !!job.applications.length,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { jobId } }: { params: { jobId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.resumeUrl) {
      return new NextResponse("Update profile to appy role.", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorised access", { status: 401 });
    }

    await db.application.upsert({
      where: {
        jobId_userId: {
          userId: user.id!,
          jobId,
        },
      },
      create: {
        userId: user.id!,
        jobId,
      },
      update: {},
    });
    return new NextResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { jobId } }: { params: { jobId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json("Unauthorised access", { status: 401 });
    }

    await db.application.deleteMany({
      where: {
        jobId,
        userId: user.id,
      },
    });

    return new NextResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
