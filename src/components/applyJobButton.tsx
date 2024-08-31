"use client";
import React, { useState } from "react";
import { toast } from "./ui/use-toast";
import { ApplyJobAction } from "@/actions/actions";

interface ApplyJobButtonProps {
  jobId: string;
  isApply?: boolean;
}
const ApplyJobButton = ({
  jobId,
  isApply: initialApply,
}: ApplyJobButtonProps) => {
  const [isLiked, setIsApply] = useState(initialApply);
  const [isLoading, setIsLoading] = useState(false);

  const applyJob = async () => {
    setIsLoading(true);
    try {
      await ApplyJobAction(jobId);
      setIsApply(result.status === "applied");
      toast({
        title: "Application submitted",
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <div>A</div>;
};

export default ApplyJobButton;
