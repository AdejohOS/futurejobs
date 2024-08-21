import React from "react";
import { CompanyColumn, columns } from "./_components/columns";
import { DataTable } from "../../components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Cross, Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { CompanyClient } from "./_components/client";
import { TitleHeadings } from "@/components/titleHeadings";
import { currentUserId } from "@/lib/auth";
import { format } from "date-fns";

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
    logoUrl: company.logoUrl!,
    createdAt: format(company.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <section>
      <div className="container m-auto my-12">
        <CompanyClient data={formattedCompany} />
      </div>
    </section>
  );
};

export default page;
