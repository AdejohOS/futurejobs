import {
  Briefcase,
  Globe,
  LogIn,
  MapPin,
  Phone,
  Pin,
  User,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-sky-950 w-full">
      <div className="container mx-auto py-12">
        <div className="flex gap-4 justify-around">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/white.svg"
                alt="FutureJobs Logo"
                height={80}
                width={80}
              />
              <h3 className="text-gray-100 font-bold">FutureJobs</h3>
            </div>

            <address className="text-gray-100 flex items-center gap-2">
              <MapPin className="size-4" />
              22, konami, Frankfurt, Germany
            </address>
            <Link
              href="tel:+123456789"
              className="text-gray-100 flex items-center gap-2"
            >
              <Phone className="size-4" />
              +123 456 789
            </Link>
            <Link href="/" className="text-gray-100 flex items-center gap-2">
              <Globe className="size-4" />
              futurejobs.com
            </Link>
          </div>
          <div>
            <h3 className="text-gray-100 font-bold  text-xl">Links</h3>
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-gray-100"
            >
              <LogIn className="size-4" /> Login/SignUp
            </Link>
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-gray-100"
            >
              <Briefcase className="size-4" /> Jobs
            </Link>
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-gray-100"
            >
              <User className="size-4" /> Profile
            </Link>
          </div>
          <div>
            <h3 className="text-gray-100 font-bold text-xl">Newsletter</h3>
            <p className="text-sm text-gray-100">
              Subscribe to our newsletter!
            </p>
            <form action="" className="space-y-2">
              <Input placeholder="example@domain.com " type="email" />

              <Button variant="theme" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
