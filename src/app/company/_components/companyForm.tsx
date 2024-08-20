"use client";
import { createCompanyAction } from "@/actions/actions";
import { Button } from "@/components/ui/button";
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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CompanyForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<CompanyValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: "",
      about: "",
      website: "",
      location: "",
      address: "",
    },
  });

  const createCompany = async (data: CompanyValues) => {
    setIsLoading(true);
    try {
      await createCompanyAction(data);
      toast({
        description: "Company created successfully.",
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
        <h2 className="text-xl font-bold">Register a new company</h2>
        <p>Fill out the fields below to register a company.</p>
      </div>
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
                      placeholder="type company name..."
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
                      placeholder="https://www.exapmle.com"
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
                      placeholder="where are you located?"
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
                      placeholder="Location"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Company:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="what is the company about?"
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
              {isLoading && <Loader className="h-5 w-5 animate-spin" />}Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyForm;
