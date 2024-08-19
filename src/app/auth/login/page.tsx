import React, { useState } from "react";
import CardWrapper from "../_components/cardWrapper";

import SocialLogin from "../_components/socialLogin";

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center my-20">
      <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account? Signup!"
        backButtonHref="/auth/register"
      >
        <SocialLogin />
      </CardWrapper>
    </section>
  );
};

export default LoginPage;
