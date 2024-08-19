import React from "react";
import CardWrapper from "../_components/cardWrapper";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterPage = () => {
  return (
    <section className="flex items-center justify-center my-20">
      <CardWrapper
        headerLabel="Create an account!"
        backButtonLabel="Already have an account? Login!"
        backButtonHref="/auth/login"
      >
        <div className="space-y-4">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FcGoogle className="h-5 w-5 shrink-0" /> Google
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FaGithub className="h-5 w-5 shrink-0" />
            Github
          </Button>
        </div>
      </CardWrapper>
    </section>
  );
};

export default RegisterPage;
