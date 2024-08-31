"use client";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { Job } from "@/types";
import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ReactTimeAgo from "react-time-ago";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-md p-4">
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
        <p>{job.description}</p>
        <div className="flex gap-2 my-2">
          <p className="text-orange-600 font-semibold bg-orange-100 text-xs px-3 py-2 rounded-md">
            {job.position} Positions
          </p>
          <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
            {job.jobType}
          </p>
          <p className="text-green-600 font-semibold bg-green-100 text-xs px-3 py-2 rounded-md">
            {job.experienceLevel} Years
          </p>
        </div>

        <div className="flex gap-2">
          <p className="text-blue-600 font-semibold bg-blue-100 text-xs px-3 py-2 rounded-md">
            &#36; {formatNumber(job.salary)}/Year
          </p>
          <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
            {job.location}
          </p>
        </div>

        <div className="flex  items-center justify-between mt-4">
          <div className="flex gap-3">
            <Button variant="theme" className="">
              Apply Now
            </Button>
            <Button
              onClick={() => router.push(`/talent/jobs/${job.id}`)}
              variant="outline"
              className=""
            >
              View Details
            </Button>
          </div>

          <p className="text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />{" "}
            <ReactTimeAgo date={job.createdAt} locale="en-us" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
