"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppState } from "./state-wrapper";

interface IAuthRule {
  children?: React.ReactNode;
  mustBe?: "authenticated" | "unauthenticated";
}

export default function AuthRule({ children, mustBe }: IAuthRule) {
  const [showPage, setShowPage] = useState<boolean | null>(null);
  const { user } = useContext(AppState);
  const router = useRouter();

  useEffect(() => {
    if (
      (user === null && mustBe === "authenticated") ||
      (user && mustBe === "unauthenticated")
    ) {
      setShowPage(false);
    } else {
      setShowPage(true);
    }
  }, [user]);

  useEffect(() => {
    if (showPage === false) {
      router.replace("/");
    }
  }, [showPage]);

  if (showPage === null) return <></>;
  if (showPage) return <>{children}</>;
}
