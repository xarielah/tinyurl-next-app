"use client";
import { useState } from "react";
import CommonPage from "../app-components/core/common-page";
import CreatedUrl from "../app-components/shorten/created-url";
import ShortenURL from "../app-components/shorten/shorten-url";

export interface IShortenedURLResult {
  originalUrl: string;
  shortId: string;
}

export default function Home() {
  const [createdUrl, setCreatedUrl] = useState<IShortenedURLResult | null>(
    null
  );

  const resetCreatedUrl = () => setCreatedUrl(null);

  if (createdUrl)
    return <CreatedUrl result={createdUrl} reset={resetCreatedUrl} />;
  return (
    <CommonPage title="">
      <div className="w-full space-y-6 text-center">
        <ShortenURL setCreatedUrl={(data) => setCreatedUrl(data)} />
      </div>
    </CommonPage>
  );
}
