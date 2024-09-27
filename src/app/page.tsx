import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
        Shorten Your URL
      </h1>
      <p className="text-muted-foreground">
        Paste your long URL below and we'll shorten it for you in seconds.
      </p>
      <form className="flex space-x-2">
        <Input
          type="url"
          placeholder="Enter your long URL here"
          className="flex-grow"
          required
        />
        <Button type="submit">Shorten</Button>
      </form>
    </div>
  );
}
