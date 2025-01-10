import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import Footer from "@/components/footer";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: " %s | Futurejobs ",
    default: "Futurejobs | Get employed with ease!",
  },
  description:
    "At future jobs we connect Recruiters in the industry to great Talents providing them with the right information and ensuring better engagements",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        className="scroll-smooth antialiased"
        suppressHydrationWarning
      >
        <body
          className={cn(
            `flex min-h-screen flex-col antialiased font-sans`,
            poppins.variable
          )}
        >
          <ReactQueryProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Header />
            <div className="flex-grow">{children}</div>

            <Footer />
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
