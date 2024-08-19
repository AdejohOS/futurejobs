"use server";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateRole = async (newRole: UserRole) => {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "Forbidden server action" };
  }
  try {
    const update = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });
    revalidatePath("/settings");
    return update;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
