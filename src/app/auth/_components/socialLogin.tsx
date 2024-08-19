"use client";

import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";

const SocialLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const githubLogin = () => {
    setLoading(true);
    try {
      signIn("github");
      router.push(DEFAULT_LOGIN_REDIRECT);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = () => {
    setLoading(true);
    try {
      signIn("google");
      router.push(DEFAULT_LOGIN_REDIRECT);
    } catch (error) {
      console.log("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => googleLogin()}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        {loading ? (
          <Loader className="h-5 w-5 shrink-0 animate-spin" />
        ) : (
          <FcGoogle className="h-5 w-5 shrink-0" />
        )}
        Google
      </Button>

      <Button
        onClick={() => githubLogin()}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        {loading ? (
          <Loader className="h-5 w-5 shrink-0 animate-spin" />
        ) : (
          <FaGithub className="h-5 w-5 shrink-0" />
        )}
        Github
      </Button>
    </div>
  );
};

export default SocialLogin;
