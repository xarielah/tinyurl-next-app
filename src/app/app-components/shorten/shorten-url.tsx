"use client";
import { IShortenedURLResult } from "@/app/(pages)/page";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import * as shortenService from "@/services/shorten.service";
import { AppState } from "@/wrappers/state-wrapper";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface IShortenURL {
  setCreatedUrl: (data: IShortenedURLResult) => void;
}

export default function ShortenURL({ setCreatedUrl }: IShortenURL) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useContext(AppState);
  const router = useRouter();
  const { toast } = useToast();

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value.replace(" ", ""));
  };

  const rerouteUnauthorized = () => {
    toast({
      title: "You must be logged in to shorten a URL!",
      variant: "destructive",
      description: "Please log in or sign up to shorten a URL.",
    });
    router.push("/login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return rerouteUnauthorized();
    setLoading(true);
    setErrorMessage("");
    shortenService
      .createShortenURL(url)
      .then((res) => {
        if (res.status === 401) {
          rerouteUnauthorized();
          throw new Error("Unauthorized");
        }
        const { url, shortId } = res.data;
        return { originalUrl: url, shortId };
      })
      .then((data) => setCreatedUrl(data))
      .then(() => setUrl(""))
      .catch((err) => {
        setErrors(err);
        setUrl("");
      })
      .finally(() => setLoading(false));
  };

  const setErrors = (err: any) => {
    if (err.status === 400) setErrorMessage("URL must be a valid URL address");
    else if (err.status === 401)
      setErrorMessage("You must be logged in to shorten a URL");
    else setErrorMessage("An error occurred. Please try again.");
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter mx-auto sm:text-6xl w-max">
        Shorten Your URL
      </h1>
      <p className="text-muted-foreground">
        Paste your long URL below and we'll shorten it for you in seconds.
      </p>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <>
          {errorMessage ? <DisplayErrorAlert msg={errorMessage} /> : ""}
          <form className="flex space-x-2" onSubmit={handleSubmit}>
            <Input
              value={url}
              onChange={onUrlChange}
              type="url"
              placeholder="Enter your long URL here"
              className="flex-grow"
              required
            />
            <Button type="submit">Shorten</Button>
          </form>
        </>
      )}
    </>
  );
}

function DisplayErrorAlert({ msg }: { msg: string }) {
  return <Alert variant="destructive">{msg}</Alert>;
}
