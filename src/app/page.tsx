import Hero from "@/components/hero";
import Jobs from "@/components/jobs";
import JobSection from "@/components/jobSection";
import FetchJobs from "@/helpers/fetchJobs";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <JobSection />
    </main>
  );
}
