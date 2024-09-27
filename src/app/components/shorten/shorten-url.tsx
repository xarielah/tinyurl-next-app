"use client";
import { IShortenedURLResult } from "@/app/page";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as shortenService from "@/services/shorten.service";
import { useState } from "react";

interface IShortenURL {
  setCreatedUrl: (data: IShortenedURLResult) => void;
}

export default function ShortenURL({ setCreatedUrl }: IShortenURL) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value.replace(" ", ""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    shortenService
      .createShortenURL(url)
      .then((res) => ({
        originalUrl: res.data.url,
        shortId: res.data.shortId,
      }))
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
    else setErrorMessage("An error occurred. Please try again.");
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
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
