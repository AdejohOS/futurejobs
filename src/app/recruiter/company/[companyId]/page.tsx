import { db } from "@/lib/db";
import React from "react";
import CompanyForm from "./companyForm";

const CompanyDetails = async ({
  params,
}: {
  params: { companyId: string };
}) => {
  const company = await db.company.findFirst({
    where: {
      id: params.companyId,
    },
  });
  return (
    <section>
      <div className="container m-auto my-12">
        <CompanyForm initialData={company!} companyId={company?.id} />
      </div>
    </section>
  );
};

export default CompanyDetails;
