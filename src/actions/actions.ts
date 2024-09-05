"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CompanySchema,
  CompanyValues,
  JobSchema,
  JobValues,
  UpdateRoleSchema,
  UpdateRoleValues,
} from "@/lib/zodValidation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

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
    return { error: "Innnvalid Fields" };
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

  // delete img from cloudinary
  if (company.logoUrl) {
    await cloudinary.uploader.destroy(company.logoUrl, {
      invalidate: true,
      resource_type: "image",
    });
  }

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
    description,
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
      description,
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
export const updateJobAction = async (data: JobValues, jobId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised Access" };
  }

  if (user.role! === "RECRUITER") {
    return { error: "Forbidden Server Action" };
  }

  const validatedFields = JobSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    title,
    companyId,
    description,
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
      description,
      requirement,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
    },
  });

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
