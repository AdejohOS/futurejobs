"use client";

import {
  createCompanyAction,
  deleteCompanyAction,
  updateCompanyAction,
} from "@/actions/actions";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertModal from "@/components/modals/alertModal";

interface CompanyFormProps {
  initialData: Company;
  companyId?: string;
}

const CompanyForm = ({ initialData, companyId }: CompanyFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      logoUrl: initialData?.logoUrl || "",
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
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={isLoading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
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
