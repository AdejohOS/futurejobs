import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { Briefcase, Building, CheckCircle } from "lucide-react";

interface RecruiterOverviewProps {
  recruiterCompanyCount: number;
  recruiterJobCount: number;
  recruiterApprovedCount: number;
}

const RecruiterOverview = ({
  recruiterCompanyCount,
  recruiterJobCount,
  recruiterApprovedCount,
}: RecruiterOverviewProps) => {
  return (
    <div>
      <Separator />
      <h2 className="text-3xl font-bold my-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="size-5 text-muted-foreground" /> Companies
            </CardTitle>
            <CardDescription>Total companies created</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{formatNumber(recruiterCompanyCount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="size-5 text-muted-foreground" />
              Jobs
            </CardTitle>
            <CardDescription>Total jobs posted</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{formatNumber(recruiterJobCount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {" "}
              <CheckCircle className="size-5 text-muted-foreground" />
              Approved Jobs
            </CardTitle>
            <CardDescription>Total jobs approved</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{formatNumber(recruiterApprovedCount)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterOverview;
