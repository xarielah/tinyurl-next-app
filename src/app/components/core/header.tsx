"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppState } from "@/wrappers/state-wrapper";
import { LinkIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  AuthenticatedDropdownContent,
  LoginDropdownItem,
  UserIsNotSigned,
  UserSignedIn,
} from "./auth-options";

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

type NavItem = {
  name: string;
  href: string;
};

export default function Header() {
  const { user } = useContext(AppState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="bg-background w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl flex gap-2 items-center font-bold text-foreground"
            >
              <LinkIcon />
              SHRT
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              {user ? <UserSignedIn user={user} /> : <UserIsNotSigned />}
            </div>
          </div>
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                  <>
                    <AuthenticatedDropdownContent />
                    <DropdownMenuSeparator />
                  </>
                ) : (
                  <>
                    <LoginDropdownItem />
                    <DropdownMenuSeparator />
                  </>
                )}
                {navItems.map((item) => (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    key={item.name}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
