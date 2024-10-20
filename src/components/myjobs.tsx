"use client";

import { Button } from "@/components/ui/button";
import { formatNumber, formatRelativeDate } from "@/lib/utils";
import { Job } from "@/types";
import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Badge } from "./ui/badge";

interface MyJobsProps {
  job: Job;
}

const MyJobs = ({ job }: MyJobsProps) => {
  const router = useRouter();
  return (
    <article className="bg-gray-100/80 rounded-md p-4 shadow">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="relative rounded-full drop-shadow-md bg-white shrink-0 p-2">
            <Image
              src={job.company.logoUrl}
              alt="companyLogo"
              height={50}
              width={50}
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-semibold">{job.company.name}</h2>
            <p className="text-sm">{job.company.location}</p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="bg-slate-50 rounded-full p-4 "
        >
          <Heart className="w-4 h-4 text-slate-500 shrink-0" />
        </Button>
      </div>
      <div>
        <h2 className="font-bold text-xl py-4">{job.title}</h2>
        <p className="">{job.description.slice(0, 100)}...</p>
        <div className="flex gap-2 my-2">
          <Badge className="text-orange-600 bg-orange-100 ">
            {job.position} Positions
          </Badge>
          <Badge className="text-red-600  bg-red-100 ">{job.jobType}</Badge>
          <Badge className="text-green-600  bg-green-100 ">
            {job.experienceLevel} Years
          </Badge>
        </div>

        <div className="flex gap-2">
          <Badge className="text-blue-600  bg-blue-100 ">
            &#36; {formatNumber(job.salary)}/Year
          </Badge>
          <Badge className="text-red-600  bg-red-100 ">{job.location}</Badge>
        </div>

        <div className="flex  items-center justify-between mt-4">
          <Button
            onClick={() => router.push(`/talent/jobs/${job.id}`)}
            variant="theme"
            className=""
          >
            View Details
          </Button>

          <p className="text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatRelativeDate(job.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MyJobs;
