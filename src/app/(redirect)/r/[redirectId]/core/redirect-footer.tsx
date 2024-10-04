import Link from "next/link";

export default function RedirectFooter() {
  return (
    <footer className="p-4 bg-primary text-white text-center text-sm">
      <Link className="hover:text-gray-50" href="/">
        Shorten your own link in seconds!
      </Link>
    </footer>
  );
}
