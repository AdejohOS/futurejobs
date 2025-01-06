"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Globe, Mail, Phone, User } from "lucide-react";
import { FaFilePdf, FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Span } from "next/dist/trace";
import RecruiterOverview from "./recruiter-overview";

interface ProfileProps {
  recruiterCompanyCount: number;
  recruiterJobCount: number;
  recruiterApprovedCount: number;
}

const Profile = ({
  recruiterCompanyCount,
  recruiterJobCount,
  recruiterApprovedCount,
}: ProfileProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>
            <Image
              src={user?.image || ""}
              alt="Profile image"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div>
            <h2 className="font-bold text-xl">{user?.name}</h2>
            <p className="text-muted-foreground">Role: {user?.role}</p>

            <p className="p-4 mt-2 max-w-[500px]">
              <span className="text-2xl">👋</span>
              {user?.bio ? (
                <em className="text-muted-foreground text-sm">
                  &quot; {user?.bio} &quot;
                </em>
              ) : (
                <em className="text-xs text-muted-foreground">
                  Update with your bio.
                </em>
              )}
            </p>
          </div>
        </div>

        <>
          <Button
            variant="theme"
            onClick={() => router.push("/profile/update")}
          >
            <span>
              <Edit className="mr-2 h-4 w-4 " />
            </span>
            Update
          </Button>
        </>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-muted-foreground flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {user?.email}
        </p>
        {user?.role === "TALENT" && (
          <>
            <Link
              href={user?.githubUrl || "/"}
              target="_blank"
              className="flex gap-2 items-center hover:underline"
            >
              <FaGithub className="h-4 w-4" />{" "}
              {user?.githubUrl || (
                <span className="text-xs text-muted-foreground">
                  Update with your github link.
                </span>
              )}
            </Link>

            <Link
              href={user?.websiteUrl || "/"}
              target="_blank"
              className="flex gap-2 items-center hover:underline"
            >
              <Globe className="h-4 w-4" />{" "}
              <span className="text-xs text-muted-foreground">
                {user?.websiteUrl || "Update with your portfolio link."}
              </span>
            </Link>
          </>
        )}
      </div>
      <div className="mt-4 space-y-2">
        {user?.role === "TALENT" && (
          <div>
            <p>Skills</p>
            <span>
              <Badge>Javascript</Badge> <Badge>Next Js</Badge>{" "}
              <Badge>PHP</Badge>
            </span>
          </div>
        )}

        {user?.role === "TALENT" && (
          <div className="flex gap-2 mt-4">
            <FaFilePdf />
            {user.resumeUrl ? (
              <a
                href={user?.resumeUrl}
                download
                className="text-blue-500 text-sm"
              >
                {user.name}.pdf
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">
                Update with your resume.
              </span>
            )}
          </div>
        )}
      </div>
      {user?.role === "RECRUITER" && (
        <RecruiterOverview
          recruiterCompanyCount={recruiterCompanyCount}
          recruiterJobCount={recruiterJobCount}
          recruiterApprovedCount={recruiterApprovedCount}
        />
      )}
    </Card>
  );
};

export default Profile;
