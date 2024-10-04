"use client";
import AuthRule from "@/wrappers/auth-rule";
import LinkDashboard from "./wrapper/link-dashboard";

export default function ShortenDashboard({ params }: any) {
  return (
    <AuthRule mustBe="authenticated">
      <LinkDashboard params={params} />
    </AuthRule>
  );
}
