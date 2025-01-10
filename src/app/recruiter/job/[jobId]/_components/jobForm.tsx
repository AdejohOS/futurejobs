"use client";

import {
  createJobAction,
  deleteJobAction,
  updateJobAction,
} from "@/actions/actions";

import AlertModal from "@/components/modals/alertModal";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { JobSchema, JobValues } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job, Company } from "@prisma/client";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import the Editor component to ensure it only runs on the client side
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

interface JobFormProps {
  initialData: Job;
  companies: Company[];
  jobId?: string;
}

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Type " / " for commands or start writing...',
        },
      ],
    },
  ],
};

export default function JobForm({
  initialData,
  companies,
  jobId,
}: JobFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(" ");

  const router = useRouter();

  const title = initialData ? "Update job" : "Add a new job!";
  const descriptionText = initialData
    ? "Edit fields below to update job."
    : "Fill out the fields below to add a new job.";
  const action = initialData ? "Update" : "Create";
  const toastMessage = initialData
    ? "Job updated successfully."
    : "Job created successfully.";

  const defaultValues = initialData
    ? {
        ...initialData,
        salary: parseInt(String(initialData?.salary)),
        position: parseInt(String(initialData?.position)),
        experienceLevel: parseInt(String(initialData?.experienceLevel)),
      }
    : {
        title: "",
        companyId: "",
        requirement: "",
        summary: "",

        salary: 0,
        location: "",
        position: 0,
        jobType: "",
        experienceLevel: 0,
      };

  const form = useForm<JobValues>({
    resolver: zodResolver(JobSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const createUpdateJob = async (data: JobValues) => {
    try {
      if (initialData) {
        await updateJobAction(jobId!, data);

        toast({
          title: toastMessage,
        });
      } else {
        await createJobAction(data);
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
      await deleteJobAction(jobId!);
      toast({
        title: "Job deleted successfully!",
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
          <p>{descriptionText}</p>
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
            onSubmit={form.handleSubmit(createUpdateJob)}
            action=""
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter job title..."
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
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company:</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a company"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {" "}
              <FormField
                control={form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job requirement:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter job requirement..."
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
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary ( in &#36;):</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="job salary..."
                        {...field}
                        disabled={isLoading}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe the job type eg 'Full-time'..."
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of available positions:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Number of available positions..."
                        {...field}
                        disabled={isLoading}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write job summary"
                      {...field}
                      disabled={isLoading}
                      className="resize-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="prose prose-stone">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Editor
                        initialValue={defaultValue}
                        onChange={setDescription}
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
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (in years):</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Years of role efficiency..."
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
                        type="text"
                        placeholder="Job location..."
                        {...field}
                        disabled={isLoading}
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
                onClick={() => router.push("/recruiter/job")}
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
}
