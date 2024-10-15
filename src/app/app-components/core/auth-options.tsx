import logout from "@/actions/logout-user.action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionUser } from "@/services/auth.service";
import AuthRule from "@/wrappers/auth-rule";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IUserSignedIn {
  user: SessionUser;
}

export function UserSignedIn({ user }: IUserSignedIn) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center hover:bg-gray-400/10 rounded-lg text-sm cursor-pointer px-2 py-1 ease-in-out duration-300 gap-2 justify-center">
          <Avatar className="shadow-sm broder-slate-950 border-2 w-8 h-8">
            <AvatarFallback className="uppercase bg-gray-200/80">
              {user.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span>{user.username}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AuthenticatedDropdownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserIsNotSigned() {
  return (
    <AuthRule mustBe="unauthenticated">
      <Link href="/login">
        <Button size="sm">
          <UserCircle2Icon className="h-5 w-5 mr-2" />
          Sign In
        </Button>
      </Link>
    </AuthRule>
  );
}

export function AuthenticatedDropdownContent() {
  const router = useRouter();
  const doLogout = async () => {
    await logout().then(() => router.refresh());
  };
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <Link href="/dashboard">
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
      </Link>
      <DropdownMenuItem className="text-red-500 cursor-pointer hover:text-red-700">
        <button onClick={doLogout}>Logout</button>
      </DropdownMenuItem>
    </>
  );
}

export function LoginDropdownItem() {
  return (
    <Link href="/login">
      <DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
  );
}
