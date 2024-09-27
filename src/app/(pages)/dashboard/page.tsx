"use client";
import AuthRule from "@/wrappers/auth-rule";
import { DataTable } from "./(page-components)/data-table";

export default function DashboardPage() {
  return (
    <AuthRule mustBe="authenticated">
      <div className="mx-auto space-y-6 flex-grow max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Your Shortened Links
        </h1>
        <DataTable />
      </div>
    </AuthRule>
  );
}
