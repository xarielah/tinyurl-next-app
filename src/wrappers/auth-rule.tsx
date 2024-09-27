"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppState } from "./state-wrapper";

interface IAuthRule {
  children?: React.ReactNode;
  allowAnonymous?: boolean;
  mustBe?: "authenticated" | "unauthenticated";
}

export default function AuthRule({
  children,
  allowAnonymous,
  mustBe,
}: IAuthRule) {
  if (allowAnonymous) return <>{children}</>;
  const appState = useContext(AppState);
  const { user } = appState;
  if (user === undefined) return <></>;
  if (user === null && mustBe === "unauthenticated") return <>{children}</>;
  if (user && mustBe === "authenticated") return <>{children}</>;
  const router = useRouter();
  router.replace("/");
  return <div>Loading...</div>;
}
