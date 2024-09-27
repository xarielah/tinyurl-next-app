import { getSessionAction } from "@/actions/get-session.action";
import StateWrapper from "@/wrappers/state-wrapper";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "./components/core/footer";
import Header from "./components/core/header";
import "./globals.css";

const font = Roboto({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyURL",
  description: "Because size does matter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getSessionAction();

  return (
    <StateWrapper user={user}>
      <html lang="en">
        <body
          className={`${font.className} antialiased flex flex-col min-h-screen`}
        >
          <Header />
          <main className="flex-grow flex items-center justify-center px-6">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </StateWrapper>
  );
}
