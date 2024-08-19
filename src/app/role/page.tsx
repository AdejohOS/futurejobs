import RoleForm from "@/app/role/_components/roleForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Briefcase, TriangleAlert } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <section className="container mx-auto">
      <div className="max-w-[700px] mx-auto my-20">
        <Card>
          <CardHeader>
            <h2 className="font-bold text-2xl justify-center flex gap-2 items-center">
              Update role{" "}
              <Briefcase className="text-muted-foreground h-5 w-5" />
            </h2>
            <Separator className="my-8" />
            <CardContent>
              <RoleForm />
            </CardContent>

            <CardFooter className="text-center w-full">
              <p className="text-center w-full text-xs flex items-center gap-2 justify-center">
                <TriangleAlert className="w-5 h-5 text-red-500" /> Once created,
                Role cannot be modified.
              </p>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default page;
