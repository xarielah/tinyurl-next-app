import { Button } from "@/components/ui/button";
import { LinkIcon, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <Link href="/" className="flex items-center space-x-2">
        <LinkIcon className="h-6 w-6" />
        <span className="text-xl font-bold">TinyURL</span>
      </Link>
      <UserSignedIn />
    </header>
  );
}

function UserSignedIn() {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-muted-foreground">Welcome, User!</span>
      <Button variant="outline" size="sm">
        <UserCircle className="h-5 w-5 mr-2" />
        Logout
      </Button>
    </div>
  );
}

function UserIsNotSigned() {
  return (
    <Link href="/login">
      <Button variant="outline" size="sm">
        <UserCircle className="h-5 w-5 mr-2" />
        Sign In
      </Button>
    </Link>
  );
}
