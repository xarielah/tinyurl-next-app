import { Toaster } from "@/components/ui/toaster";
import StateWrapper from "@/wrappers/state-wrapper";
import type { Metadata } from "next";
import { Noto_Sans as Font } from "next/font/google";
import Header from "../app-components/core/header";
import "../globals.css";

const font = Font({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyURL",
  description: "Because size does matter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StateWrapper>
      <html lang="en">
        <body
          className={`${font.className} antialiased flex flex-col min-h-screen`}
        >
          <Header />
          <main className="flex-grow flex justify-center pt-12 px-6">
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </StateWrapper>
  );
}
