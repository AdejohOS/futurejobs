import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="container mx-auto my-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[100px] font-bold">404</h2>
          <p className="text-2xl mb-3">Sorry, the page not found!</p>
          <Link href="/">
            <Button variant="theme" className="flex items-center gap-2">
              <ArrowBigLeft className="h-4 w-4" /> Return home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
