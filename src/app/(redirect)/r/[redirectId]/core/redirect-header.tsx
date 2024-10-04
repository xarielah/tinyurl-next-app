import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function RedirectHeader() {
  return (
    <header className="p-2 bg-primary text-white">
      <Link href="/" className="hover:text-gray-50">
        <h1 className="font-bold text-2xl">
          <LinkIcon className="inline mr-2" />
          Shorten
        </h1>
      </Link>
    </header>
  );
}
