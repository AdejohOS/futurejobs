import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import Footer from "@/components/footer";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

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
        <body className={font.className}>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
