"use server";
import { currentUser, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CompanySchema,
  CompanyValues,
  UpdateRoleSchema,
  UpdateRoleValues,
} from "@/lib/zodValidation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

// Create company
export const createCompanyAction = async (data: CompanyValues) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Forbidden Server Action" };
  }
  if (user?.role !== "RECRUITER") {
    return { error: "Forbidden Server Action" };
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
