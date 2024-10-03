import kyInstance from "@/lib/ky";
import { ApplicationInfo } from "@/types";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { SquareMousePointer } from "lucide-react";

interface ApplicationButtonProps {
  jobId: string;
  initialState: ApplicationInfo;
}
const ApplicationButton = ({ jobId, initialState }: ApplicationButtonProps) => {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["application-info", jobId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance
        .get(`/api/jobs/${jobId}/application/applyJob`)
        .json<ApplicationInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.hasUserApplied
        ? kyInstance.delete(`/api/jobs/${jobId}/application/applyJob`)
        : kyInstance.post(`/api/jobs/${jobId}/application/applyJob`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<ApplicationInfo>(queryKey);

      queryClient.setQueryData<ApplicationInfo>(queryKey, () => ({
        hasUserApplied: !previousState?.hasUserApplied,
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    },
  });
  return (
    <Button
      onClick={() => mutate()}
      variant={data.hasUserApplied ? "outline" : "theme"}
      className="flex items-center gap-2"
    >
      <SquareMousePointer className="h-4 w-4" />{" "}
      {data.hasUserApplied ? "Delete application" : "Apply role"}
    </Button>
  );
};

export default ApplicationButton;
