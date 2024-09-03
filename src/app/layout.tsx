import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/reactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: " %s | Futurejobs ",
    default: "Futurejobs | Get employed with ease!",
  },
  description:
    "At future jobs we connect Recruiters in the industry to great talents providing the with the right information and providing great prospects",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <Header />
            {children}
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
