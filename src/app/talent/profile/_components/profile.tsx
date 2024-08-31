"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const user = useCurrentUser();
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
            <Card className="p-4 mt-2 max-w-[500px]">
              I am a passionate web developer with the right skillset for
              building highly scalable and efficient applications.
            </Card>
          </div>
        </div>

        <>
          <Button variant="theme">
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
        <p className="flex gap-2 items-center">
          <Phone className="h-4 w-4" /> 07063494394
        </p>
        <p className="flex gap-2 items-center">
          <FaGithub className="h-4 w-4" /> github.com/adejohOs
        </p>
        <p className="flex gap-2 items-center">
          <User className="h-4 w-4" /> adejohos.dev
        </p>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <p>Skills</p>
          <span>
            <Badge>Javascript</Badge> <Badge>Next Js</Badge> <Badge>PHP</Badge>
          </span>
        </div>
        <div>
          <p>Resume</p>
          <a href="/" download className="text-blue-500 text-sm">
            browny.pdf
          </a>
        </div>
      </div>
    </Card>
  );
};

export default Profile;