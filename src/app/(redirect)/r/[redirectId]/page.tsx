"use client";
import { useEffect, useState } from "react";
import RedirectLoader from "./redirects/loader";

interface IRedirect {
  params: {
    redirectId: string;
  };
}

export default function Redirect({ params }: IRedirect) {
  const [loading, setLoading] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    const to = setTimeout(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      if (seconds === 0) {
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(to);
  }, [seconds]);

  return (
    <section>
      {loading ? <LoadingLayout seconds={seconds} /> : ""}
      {!loading ? <RedirectLoader redirectUrl={params.redirectId} /> : ""}
    </section>
  );
}

interface ILoadingLayout {
  seconds: number;
}

function LoadingLayout({ seconds }: ILoadingLayout) {
  return (
    <h1 className="text-2xl font-bold">
      You will be redirected in {seconds} seconds...
    </h1>
  );
}
