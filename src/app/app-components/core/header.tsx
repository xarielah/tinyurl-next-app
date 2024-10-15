"use client";

import { AppState } from "@/wrappers/state-wrapper";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";

export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About This Project", href: "/about" },
];

type NavItem = {
  name: string;
  href: string;
};

export default function Header() {
  const { user } = useContext(AppState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="w-full p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl flex gap-2 items-center font-bold"
            >
              <LinkIcon />
              <h1>ShortenYourLinks</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <DesktopMenu />
          </div>
          <div className="md:hidden">
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
}
