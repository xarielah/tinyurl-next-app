import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Noto_Sans as Font } from "next/font/google";
import "../globals.css";
import RedirectFooter from "./r/[redirectId]/core/redirect-footer";
import RedirectHeader from "./r/[redirectId]/core/redirect-header";

const font = Font({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyURL",
  description: "Because size does matter.",
};

export default function RedirectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased flex flex-col min-h-screen`}
      >
        <RedirectHeader />
        <main className="flex-grow flex items-center justify-center px-6">
          {children}
          <Toaster />
        </main>
        <RedirectFooter />
      </body>
    </html>
  );
}
