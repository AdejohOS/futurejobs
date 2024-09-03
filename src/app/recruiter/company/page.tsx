import React, { Suspense } from "react";
import { CompanyColumn, columns } from "./_components/columns";
import { DataTable } from "../../../components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Cross, Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { CompanyClient } from "./_components/client";
import { TitleHeadings } from "@/components/titleHeadings";
import { currentUserId } from "@/lib/auth";
import Loading from "@/app/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter companies",
};

const page = async () => {
  const userId = await currentUserId();
  const companies = await db.company.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCompany: CompanyColumn[] = companies.map((company) => ({
    id: company.id,
    name: company.name,
    logoUrl: company.logoUrl,
    createdAt: company.createdAt,
  }));

  return (
    <section>
      <div className="container m-auto my-12">
        <Suspense fallback={<Loading />}>
          <CompanyClient data={formattedCompany} />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
