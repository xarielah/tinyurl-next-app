import { AppState } from "@/wrappers/state-wrapper";
import Link from "next/link";
import { useContext } from "react";
import { UserIsNotSigned, UserSignedIn } from "./auth-options";
import { navItems } from "./header";

export default function DesktopMenu() {
  const { user } = useContext(AppState);
  return (
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
      {user === null && <UserIsNotSigned />}
      {user && <UserSignedIn user={user} />}
    </div>
  );
}
