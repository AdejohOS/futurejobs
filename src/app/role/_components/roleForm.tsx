"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UpdateRoleSchema, UpdateRoleValues } from "@/lib/zodValidation";
import { updateRole } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const RoleForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<UpdateRoleValues>({
    resolver: zodResolver(UpdateRoleSchema),
  });

  const updateRoleSubmit = async (data: UpdateRoleValues) => {
    setIsLoading(true);
    try {
      await updateRole(data);
      toast({
        title: "Role update",
        description: "Your role has been updated successfully",
      });
    } catch (error) {
      toast({
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateRoleSubmit)}
        action=""
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Click to select your role...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="TALENT" className="w-6 h-6" />
                    </FormControl>
                    <FormLabel className="font-semibold text-l">
                      Talent
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="RECRUITER" className="w-6 h-6" />
                    </FormControl>
                    <FormLabel className="font-semibold text-l">
                      Recruiter
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="theme"
          type="submit"
          className=" flex items-center gap-2"
        >
          {isLoading && <Loader className="animate-spin w-5 h-5" />} Update
        </Button>
      </form>
    </Form>
  );
};

export default RoleForm;
