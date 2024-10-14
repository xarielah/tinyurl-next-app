"use client";
import GenericLoading from "@/app/app-components/core/loading";
import * as shortenService from "@/services/shorten.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CorruptedRedirect from "./corrupted-redirect";

export default function RedirectLoader({ redirectUrl }: any) {
  const [result, setResult] = useState<string | null | undefined>();
  const router = useRouter();

  useEffect(() => {
    shortenService
      .getRedirectData(redirectUrl)
      .then((res) => setResult(res.data.url))
      .catch(() => setResult(null));
  }, []);

  useEffect(() => {
    if (result) router.push(result);
  }, [result]);

  if (result === undefined) return <GenericLoading />;
  if (result === null) return <CorruptedRedirect />;
  else
    return (
      <>
        <h1 className="font-bold text-2xl">Redirecting...</h1>
      </>
    );
}
