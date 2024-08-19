import React from "react";
import Image from "next/image";
import { Blocks, Clock, Heart } from "lucide-react";
import { Button } from "./ui/button";

const Jobs = () => {
  return (
    <section className=" bg-gray-50">
      <div className="container mx-auto py-12">
        <h2 className="font-bold text-2xl mb-4">Recent Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="relative rounded-full drop-shadow-md bg-white shrink-0 p-4">
                  <Image
                    src="/images/google.svg"
                    alt="companyLogo"
                    height={20}
                    width={20}
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">Google Inc.</h2>
                  <p className="text-sm">USA</p>
                </div>
              </div>

              <button className="bg-slate-50 rounded-full p-4">
                <Heart className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-xl py-4">Project Manager</h2>
              <p>
                As a project manager, your work will cut across areas of
                judicious planning...
              </p>
              <div className="flex gap-2 my-2">
                <p className="text-orange-600 font-semibold bg-orange-100 text-xs px-3 py-2 rounded-md">
                  10 Positions
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  Full Time
                </p>
                <p className="text-green-600 font-semibold bg-green-100 text-xs px-3 py-2 rounded-md">
                  5 Years
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-blue-600 font-semibold bg-blue-100 text-xs px-3 py-2 rounded-md">
                  $1,20, 000/Year{" "}
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  WFO
                </p>
              </div>

              <div className="flex  items-center justify-between mt-4">
                <div className="flex gap-3">
                  <Button variant="theme" className="">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="">
                    View Details
                  </Button>
                </div>

                <p className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />5 minutes ago
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="relative rounded-full drop-shadow-md bg-white shrink-0 p-4">
                  <Image
                    src="/images/insta.svg"
                    alt="companyLogo"
                    height={20}
                    width={20}
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">Instagram</h2>
                  <p className="text-sm">Nigeria</p>
                </div>
              </div>

              <button className="bg-slate-50 rounded-full p-4">
                <Heart className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-xl py-4">Web Developer</h2>
              <p>
                As web developer with a passion for creating higghly scalable
                and efficient applications...
              </p>
              <div className="flex gap-2 my-2">
                <p className="text-orange-600 font-semibold bg-orange-100 text-xs px-3 py-2 rounded-md">
                  10 Positions
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  Remote
                </p>
                <p className="text-green-600 font-semibold bg-green-100 text-xs px-3 py-2 rounded-md">
                  2 Years
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-blue-600 font-semibold bg-blue-100 text-xs px-3 py-2 rounded-md">
                  $ 120, 000/Year{" "}
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  Global
                </p>
              </div>

              <div className="flex  items-center justify-between mt-4">
                <div className="flex gap-3">
                  <button className="bg-sky-600 px-3 py-2 rounded-md text-white font-semibold">
                    Apply Now
                  </button>
                  <button className="border-2 px-3 py-2 rounded-md  font-semibold">
                    View Details
                  </button>
                </div>

                <p className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />2 days ago
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="relative rounded-full drop-shadow-md bg-white shrink-0 p-4">
                  <Image
                    src="/images/fb.png"
                    alt="companyLogo"
                    height={20}
                    width={20}
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">Facebook</h2>
                  <p className="text-sm">Canada</p>
                </div>
              </div>

              <button className="bg-slate-50 rounded-full p-4">
                <Heart className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-xl py-4">Graphic Designer</h2>
              <p>
                As a project manager, your work will cut across areas of
                judicious planning...
              </p>
              <div className="flex gap-2 my-2">
                <p className="text-orange-600 font-semibold bg-orange-100 text-xs px-3 py-2 rounded-md">
                  10 Positions
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  Full Time
                </p>
                <p className="text-green-600 font-semibold bg-green-100 text-xs px-3 py-2 rounded-md">
                  5 Years
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-blue-600 font-semibold bg-blue-100 text-xs px-3 py-2 rounded-md">
                  $1,20, 000/Year{" "}
                </p>
                <p className="text-red-600 font-semibold bg-red-100 text-xs px-3 py-2 rounded-md">
                  WFO
                </p>
              </div>

              <div className="flex  items-center justify-between mt-4">
                <div className="flex gap-3">
                  <button className="bg-sky-600 px-3 py-2 rounded-md text-white font-semibold">
                    Apply Now
                  </button>
                  <button className="border-2 px-3 py-2 rounded-md  font-semibold">
                    View Details
                  </button>
                </div>

                <p className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />1 month ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
