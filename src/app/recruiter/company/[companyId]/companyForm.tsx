"use client";

import {
  createCompanyAction,
  deleteCompanyAction,
  deleteFileUrlAction,
  updateCompanyAction,
} from "@/actions/actions";
import Image from "next/image";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CompanySchema, CompanyValues } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import AlertModal from "@/components/modals/alertModal";
import ImageUploader from "@/components/image-uploader";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import kyInstance from "@/lib/ky";
import ky from "ky";

interface CompanyFormProps {
  initialData: Company;
  companyId?: string;
}

const CompanyForm = ({ initialData, companyId }: CompanyFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [logoUrl, setLogoUrl] = useState<string>(initialData?.logoUrl);
  const [fileUrlKey, setFileUrlKey] = useState<string>("");

  const title = initialData ? "Update company" : "Register a new company";
  const description = initialData
    ? "Edit the fields below to update your company."
    : "Fill out the fields below to register a company.";
  const action = initialData ? "Update" : "Register";
  const toastMessage = initialData
    ? "Company updated successfully."
    : "Company registered successfully.";

  const form = useForm<CompanyValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: initialData?.name || "",
      about: initialData?.about || "",
      website: initialData?.website || "",
      location: initialData?.location || "",
      address: initialData?.address || "",
      logoUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const createUpdateCompany = async (data: CompanyValues) => {
    try {
      if (initialData) {
        await updateCompanyAction(companyId!, data);
        toast({
          title: toastMessage,
        });
      } else {
        await createCompanyAction(data);
        toast({
          title: toastMessage,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteCompanyAction(companyId!);
      toast({
        title: "Company deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "please try again later.",
      });
    }
  };

  useEffect(() => {
    if (typeof logoUrl === "string") {
      form.setValue("logoUrl", logoUrl, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [logoUrl, form]);

  const deleteLogoUrl = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteFileUrlAction(fileUrlKey);
      if (res?.success) {
        toast({
          title: "Success",
          description: "Logo removed",
        });
      }
      setLogoUrl("");
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
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p>{description}</p>
        </div>
        {initialData && (
          <Button
            onClick={() => setOpen(true)}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        )}
      </div>
      <Card className="p-4 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createUpdateCompany)}
            className="space-y-4"
            action="
      "
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type company name..."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website:</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.example.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Where are you located?"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Country"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo:</FormLabel>
                    <FormControl>
                      <>
                        {logoUrl ? (
                          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                              <Button
                                type="button"
                                onClick={() => deleteLogoUrl()}
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
                            <Image
                              src={logoUrl}
                              alt="Uploaded Image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <UploadButton
                            endpoint="logoImage"
                            className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                            onClientUploadComplete={(res) => {
                              setLogoUrl(res[0].url);
                              setFileUrlKey(res[0].key);
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
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Company:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="What is the company about?"
                        disabled={isLoading}
                        className="resize-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/recruiter/company")}
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
                <span>{action}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CompanyForm;
