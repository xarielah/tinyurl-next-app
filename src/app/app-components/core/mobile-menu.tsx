import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppState } from "@/wrappers/state-wrapper";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import {
  AuthenticatedDropdownContent,
  LoginDropdownItem,
} from "./auth-options";
import { navItems } from "./header";

interface IMobileMenu {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: IMobileMenu) {
  const { user } = useContext(AppState);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {navItems.map((item) => (
          <DropdownMenuItem className="cursor-pointer" key={item.name} asChild>
            <Link
              href={item.href}
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {user && <AuthenticatedDropdownContent />}
        {user === null && <LoginDropdownItem />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
