export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} TinyURL. All rights reserved.
    </footer>
  );
}
