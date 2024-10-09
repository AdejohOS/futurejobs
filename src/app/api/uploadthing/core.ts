import { currentUser, currentUserId } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user) throw new UploadThingError("Unauthorized access");
  return { user };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  logoImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),

  resumeFile: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
