"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as authService from "@/services/auth.service";
import AuthRule from "@/wrappers/auth-rule";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ILoginFields = {
  username: string;
  password: string;
};

export default function Login() {
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [fields, setFields] = useState<ILoginFields>({
    username: "",
    password: "",
  });

  const resetMsgs = () => {
    setErrMsg("");
    setSuccess("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ILoginFields
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMsgs();
    const payloadBody = JSON.stringify({
      username: fields.username,
      password: fields.password,
    });
    // await fetch("/api/auth/login", {
    //   body: payloadBody,
    //   method: "POST",
    // })
    //   .then((res) => (res.ok ? null : Promise.reject(res)))
    //   .then(() => {
    //     setSuccess("Logged in successfully!");
    //     setFields({ username: "", password: "" });
    //     setTimeout(() => router.refresh(), 1000);
    //   })
    //   .catch((err) => {
    //     if (err.status === 401) setErrMsg("Invalid username or password");
    //     else setErrMsg("An error occurred. Please try again.");
    //     setFields({ username: "", password: "" });
    //   });
    await authService
      .login({ username: fields.username, password: fields.password })
      .then((res) => (res.ok ? null : Promise.reject(res)))
      .then(() => {
        setSuccess("Logged in successfully!");
        setFields({ username: "", password: "" });
        setTimeout(() => router.refresh(), 1000);
      })
      .catch((err) => {
        if (err.status === 401) setErrMsg("Invalid username or password");
        else setErrMsg("An error occurred. Please try again.");
        setFields({ username: "", password: "" });
      });
  };

  return (
    <AuthRule mustBe="unauthenticated">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Sign in Your Account
          </h1>
          <p className="mt-2 text-muted-foreground whitespace-nowrap">
            Sign in to start shortening your URLs
          </p>
        </div>
        {errMsg && <Alert variant="destructive">{errMsg}</Alert>}
        {success && <Alert>{success}</Alert>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={(e) => handleChange(e, "username")}
              value={fields.username}
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => handleChange(e, "password")}
              value={fields.password}
              id="password"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Still don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthRule>
  );
}
