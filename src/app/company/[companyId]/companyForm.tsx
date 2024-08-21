"use client";
import { createCompanyAction } from "@/actions/actions";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CompanyFormProps {
  initialData: Company;
}

const CompanyForm = ({ initialData }: CompanyFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const title = initialData ? "Edit company" : "Register a new company";
  const description = initialData
    ? "Edit the fields below to update your company."
    : "Fill out the fields below to register a company.";
  const action = initialData ? "Update" : "Register";
  const toastMessage = initialData
    ? "Company updated successfully."
    : "Company created successfully.";

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

  const createCompany = async (data: CompanyValues) => {
    setIsLoading(true);
    try {
      await createCompanyAction(data);
      toast({
        description: toastMessage,
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <Card className="p-4 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createCompany)}
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
                onClick={() => router.push("/company")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="theme"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading && <Loader className="h-5 w-5 animate-spin" />}
                {action}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CompanyForm;
