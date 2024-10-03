"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ApplicationInfo, Job } from "@/types";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, SquareMousePointer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ApplyJobAction } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import ApplyJobButton from "@/components/applyJobButton";
import ApplicationButton from "@/components/applicationButton";
import { useCurrentUser } from "@/hooks/getCurrentUser";

interface JobItemProps {
  job: Job;
}
const JobItem = ({ job }: JobItemProps) => {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div>
            <Image
              src={job.company.logoUrl || ""}
              alt="Company Logo"
              height={100}
              width={100}
              className="rounded-full"
            />
            <h3 className="text-center font-semibold text-muted-foreground">
              {job.company.name}
            </h3>
            <p className="text-center text-muted-foreground text-sm">
              {job.company.location}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="space-x-2">
              <Badge className="text-orange-600 bg-orange-100">
                {job.position} Positions
              </Badge>
              <Badge className="text-red-600  bg-red-100">{job.jobType}</Badge>
              <Badge className="bg-blue-100 text-blue-600">
                &#36; {formatNumber(job.salary)}
              </Badge>
            </div>
          </div>
        </div>

        <ApplicationButton
          jobId={job.id}
          initialState={{
            hasUserApplied: job.applications.some(
              (application) => application.userId === user?.id
            ),
          }}
        />
      </div>

      <h2 className="text-xl font-semibold my-4">Job description</h2>
      <Separator />
      <div className="my-4 space-y-2">
        <h2>
          <span className="font-semibold">Role:</span> {job.title}
        </h2>
        <p>
          <span className="font-semibold">Location:</span> {job.location}
        </p>

        <p>
          <span className="font-semibold">Years of Experience:</span>{" "}
          {job.experienceLevel}
        </p>
        <p>
          <span className="font-semibold">Salary : </span> &#36;{" "}
          {formatNumber(job.salary)}
        </p>
        <p>
          <span className="font-semibold">Total applications : </span>{" "}
          {formatNumber(1000)}
        </p>
        <p>
          <span className="font-semibold">Date posted : </span>{" "}
          {format(job.createdAt, "MMMM do, yyyy")}
        </p>
        <div>
          <p>
            <span className="font-semibold">Description:</span>
          </p>
          <Card className="p-4 max-w-[500px] text-muted-foreground whitespace-pre-line break-words">
            {job.description}
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default JobItem;
