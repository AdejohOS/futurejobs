import JobDetails from "@/app/recruiter/job/[jobId]/page";
import kyInstance from "@/lib/ky";
import { ApplicationInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useApplicationInfo(
  jobId: string,
  initialState: ApplicationInfo
) {
  const query = useQuery({
    queryKey: ["application-info", jobId],
    queryFn: () =>
      kyInstance.get(`/api/users/${jobId}/followers`).json<ApplicationInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });
  return query;
}
