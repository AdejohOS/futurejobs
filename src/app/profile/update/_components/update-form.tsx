"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CurrentUser } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader, Trash } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { UpdateUserSchema, UpdateUserValues } from "@/lib/zodValidation";
import { deleteFileUrlAction, updateUserAction } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { FileUpload } from "@/components/file-upload";
import { UploadButton } from "@/lib/uploadthing";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";

interface UpdateFormProps {
  initialData: CurrentUser;
}

const UpdateForm = ({ initialData }: UpdateFormProps) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [resumeUrl, setResumeUrl] = useState<string>(initialData?.resumeUrl);
  const [fileUrlKey, setFileUrlKey] = useState<string>("");
  const [fileUrlName, setFileUrlName] = useState<string>("");

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData.email || "",
      bio: initialData.bio || "",
      resumeUrl: initialData.resumeUrl || "",
      githubUrl: initialData.githubUrl || "",
      websiteUrl: initialData.websiteUrl || "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const updateUser = async (values: UpdateUserValues) => {
    await updateUserAction(values);
    toast({
      title: "Profile updated Successfully!",
    });
  };

  useEffect(() => {
    if (typeof resumeUrl === "string") {
      form.setValue("resumeUrl", resumeUrl, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [resumeUrl, form]);

  const deleteResumeUrl = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteFileUrlAction(fileUrlKey);
      if (res?.success) {
        toast({
          title: "Success",
          description: "Resume removed",
        });
      }
      setResumeUrl("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `${error}`,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-4">
      <Form {...form}>
        <form
          action=""
          className="space-y-4"
          onSubmit={form.handleSubmit(updateUser)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="write a little about yourself.."
                    className="resize-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your github link..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your portfolio..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="resumeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload resume:</FormLabel>
                <FormControl>
                  <>
                    {resumeUrl ? (
                      <div className="relative size-36 rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                          <Button
                            type="button"
                            onClick={() => deleteResumeUrl()}
                            variant="destructive"
                            size="sm"
                          >
                            {isDeleting ? (
                              <Loader className="size-4 animate-spin" />
                            ) : (
                              <Trash className=" size-4" />
                            )}
                          </Button>
                        </div>
                        <Link href={resumeUrl}>
                          <FaFilePdf className=" text-muted-foreground size-24" />
                          <p className="text-xs mt-4 text-muted-foreground">
                            {fileUrlName}
                          </p>
                        </Link>
                      </div>
                    ) : (
                      <UploadButton
                        endpoint="resumeFile"
                        className="mt-4 ut-button:bg-sky-600
                         ut-button:ut-readying:bg-sky-500/50 
                         ut-button:rounded-l-full ut-button:rounded-r-full bg-slate-50
                          ut-allowed-content:text-muted-foreground w-36"
                        onClientUploadComplete={(res) => {
                          setResumeUrl(res[0].url);
                          setFileUrlKey(res[0].key);
                          setFileUrlName(res[0].name);
                          toast({
                            title: "Success",
                            description: "File uploaded sucessfully",
                          });
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: "Something went wrong",
                            description: `${error?.message}`,
                          });
                        }}
                      />
                    )}
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/profile")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="theme"
              className="space-x-2"
              disabled={isLoading}
            >
              {isLoading && <Loader className="h-5 w-5 animate-spin" />}
              <span>Update</span>
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default UpdateForm;
