import React from "react";
import { CompanyColumn, columns } from "./_components/columns";
import { DataTable } from "../../components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Cross, Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { CompanyClient } from "./_components/client";

const page = async () => {
  const companies = await db.company.findMany();

  const formattedCompany: CompanyColumn[] = companies.map((company) => ({
    id: company.id,
    name: company.name,
  }));

  return (
    <section>
      <div className="container m-auto my-12">
        <div className="flex justify-between">
          <Link href="/">
            <Button variant="secondary" className="flex items-center gap-2">
              <ArrowBigLeft className="h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/company/new">
            <Button variant="theme" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Company
            </Button>
          </Link>
        </div>
        <div className="container mx-auto py-5">
          <CompanyClient data={formattedCompany} />
        </div>
      </div>
    </section>
  );
};

export default page;
