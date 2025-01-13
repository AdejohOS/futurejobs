"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

import {
  CompanySchema,
  CompanyValues,
  JobSchema,
  JobValues,
  UpdateRoleSchema,
  UpdateRoleValues,
  UpdateUserSchema,
  UpdateUserValues,
} from "@/lib/zodValidation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//update user
export const updateUserAction = async (values: UpdateUserValues) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Forbidden server action." };
  }
  try {
    const validatedFields = UpdateUserSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { bio, resumeUrl, githubUrl, websiteUrl } = validatedFields.data;
    const job = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio,
        resumeUrl,
        githubUrl,
        websiteUrl,
      },
    });
  } catch (error) {
    return { error: (error as Error)?.message || "Failed to update user" };
  } finally {
    revalidatePath("/profile");
    redirect("/profile");
  }
};

// Create company
export const createCompanyAction = async (data: CompanyValues) => {
  const user = await currentUser();

  // user dont need to see this error
  if (!user) {
    throw Error("Unauthorised Server Action");
  }
  if (user?.role !== "RECRUITER") {
    throw Error("Forbidden Server Action");
  }

  const validatedFields = CompanySchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, website, address, location, about, logoUrl } =
    validatedFields.data;

  await db.company.create({
    data: {
      name,
      location,
      website,
      address,
      logoUrl,
      about,
      userId: user.id!,
    },
  });

  revalidatePath("/recruiter/company/create");
  redirect("/recruiter/company");
};

// update company
export const updateCompanyAction = async (
  companyId: string,
  data: CompanyValues
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Forbidden Server Action" };
  }
  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const company = await db.company.findUnique({
    where: {
      id: companyId,
      userId: user.id,
    },
  });

  if (!company) {
    return { error: "Company not found" };
  }

  const validatedFields = CompanySchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, website, address, location, about, logoUrl } =
    validatedFields.data;

  await db.company.update({
    where: {
      id: companyId,
      userId: user.id,
    },
    data: {
      name,
      website,
      address,
      location,
      about,
      logoUrl,
    },
  });

  revalidatePath("/recruiter/company");
  redirect("/recruiter/company");
};

//Delete company
export const deleteCompanyAction = async (companyId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const company = await db.company.findUnique({
    where: {
      id: companyId,
      userId: user.id,
    },
  });

  if (!company) {
    return { error: "Company not found!" };
  }
  // delete img from uploadthing
  await db.company.delete({
    where: {
      id: companyId,
      userId: user.id,
    },
  });

  revalidatePath("/recruiter/company");
  redirect("/recruiter/company");
};
export const deleteCompanyActionConfirm = async (data: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const company = await db.company.findUnique({
    where: {
      id: data,
      userId: user.id,
    },
  });

  if (!company) {
    return { error: "Company not found!" };
  }

  // delete img from cloudinary

  await db.company.delete({
    where: {
      id: data,
      userId: user.id,
    },
  });

  revalidatePath("/recruiter/company");
  redirect("/recruiter/company");
};

// Update user role
export const updateRole = async (data: UpdateRoleValues) => {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "Forbidden server action" };
  }
  const validatedFields = UpdateRoleSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { role } = validatedFields.data;

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
  revalidatePath("/role");
  redirect("/");

  return { success: "Role updated successfully!" };
};

// create job

export const createJobAction = async (data: JobValues) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const validatedFields = JobSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    title,
    companyId,
    summary,
    content,
    requirement,
    salary,
    location,
    experienceLevel,
    jobType,
    position,
  } = validatedFields.data;

  await db.job.create({
    data: {
      title,
      companyId,
      summary,
      content,
      requirement,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      userId: user.id!,
    },
  });

  revalidatePath("/recruiter/job");
  redirect("/recruiter/job");
};

// updateJob
export const updateJobAction = async (jobId: string, data: JobValues) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }
  try {
    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId: user.id,
      },
    });

    if (!job) {
      return { error: "Job not found" };
    }

    const validatedFields = JobSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const {
      title,
      companyId,
      summary,
      content,
      requirement,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
    } = validatedFields.data;

    await db.job.update({
      where: {
        id: jobId,
        userId: user.id,
      },
      data: {
        title,
        companyId,
        summary,
        content,
        requirement,
        salary,
        location,
        experienceLevel,
        jobType,
        position,
      },
    });
  } catch (error) {
    return { error: (error as Error)?.message || "Failed to update job" };
  }
  revalidatePath("/recruiter/job");
  redirect("/recruiter/job");
};

// Delete Job
export const deleteJobAction = async (jobId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const job = await db.job.findUnique({
    where: {
      id: jobId,
      userId: user.id,
    },
  });

  if (!job) {
    return { error: "Job not found!" };
  }

  // delete img from cloudinary

  await db.job.delete({
    where: {
      id: jobId,
      userId: user.id,
    },
  });

  revalidatePath("/recruiter/job");
  redirect("/recruiter/job");
};

export const deleteJobActionConfirm = async (data: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const job = await db.job.findUnique({
    where: {
      id: data,
      userId: user.id,
    },
  });

  if (!job) {
    return { error: "Job not found!" };
  }

  // delete img from cloudinary

  await db.job.delete({
    where: {
      id: data,
      userId: user.id,
    },
  });

  revalidatePath("/recruiter/job");
  redirect("/recruiter/job");
};

// Apply Job

export const ApplyJobAction = async (job: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user?.role !== "TALENT") {
    return { error: "Forbidden Server Action" };
  }

  if (user)
    try {
      const myJob = await db.job.findUnique({
        where: {
          id: job,
        },
      });

      if (!myJob) {
        return { error: "Job does not exist" };
      }

      const existingApplication = await db.job.findUnique({
        where: {
          id: job,
          userId: user.id,
        },
      });

      if (existingApplication) {
        await db.job.delete({
          where: {
            id: existingApplication.id,
          },
        });

        return { status: "deleted" };
      } else {
        await db.application.create({
          data: {
            userId: user.id!,
            jobId: job,
          },
        });
        return { status: "applied" };
      }
    } catch (error) {}
};

// approve application
export const handleApplicationAction = async (
  userId: string,
  jobId: string,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorised Access" };
    }

    if (user?.role !== "RECRUITER") {
      return { error: "Forbidden Server Action" };
    }

    await db.application.update({
      where: {
        jobId_userId: {
          userId,
          jobId,
        },
      },
      data: {
        status,
      },
    });

    revalidatePath(`/recruiter/job/${jobId}/applications`);
  } catch (error) {
    console.error("Error updating application status:", error);
    throw new Error("Failed to update application status");
  }
};

export const rejectApplicationAction = async (
  userId: string,
  jobId: string
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorised Access" };
    }

    if (user?.role !== "RECRUITER") {
      return { error: "Forbidden Server Action" };
    }
    const jobCreatedByRecruiter = await db.job.findUnique({
      where: {
        id: jobId,
        userId: user.id,
      },
    });

    if (!jobCreatedByRecruiter) {
      return { error: "Forbidden Server Action" };
    }
    await db.application.update({
      where: {
        jobId_userId: {
          userId,
          jobId: jobId,
        },
      },
      data: {
        status: "REJECTED",
      },
    });
  } catch (error) {}
};

// delete logoUrl
export const deleteFileUrlAction = async (fileUrlKey: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised access" };
  }

  try {
    await utapi.deleteFiles(fileUrlKey);
    return { success: true };
  } catch (error) {}
};
