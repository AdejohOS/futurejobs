"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ApplicationInfo, Job } from "@/types";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Edit, Loader, SquareMousePointer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ApplyJobAction } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import ApplicationButton from "@/components/applicationButton";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import Link from "next/link";

interface JobItemProps {
  job: Job;
}
const JobItem = ({ job }: JobItemProps) => {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card className="p-4">
      {user && !user?.resumeUrl && (
        <div className="text-center mb-3 bg-destructive/70 flex  justify-center gap-5 py-4 px-4 text-white items-center rounded-md">
          <p className="flex items-center gap-3">
            <AlertTriangle className="size-5" /> Please update profile to apply
            for role!
          </p>
          <Link href="/profile/update">
            <Button variant="secondary">
              <Edit className="size-4 mr-2" /> Update profile
            </Button>
          </Link>
        </div>
      )}

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

        <div className="hidden sm:block">
          <ApplicationButton
            jobId={job.id}
            initialState={{
              hasUserApplied: job.applications.some(
                (application) => application.userId === user?.id
              ),
            }}
          />
        </div>
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
          <p className="font-semibold">Description:</p>
          <Card className="p-4 max-w-[700px]">
            <article className="prose prose-stone">{job.description}</article>
          </Card>
        </div>
        <div className="sm:hidden">
          <ApplicationButton
            jobId={job.id}
            initialState={{
              hasUserApplied: job.applications.some(
                (application) => application.userId === user?.id
              ),
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default JobItem;
