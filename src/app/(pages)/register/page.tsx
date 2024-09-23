"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as authService from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";

interface IRegisterFields {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [fields, setFields] = useState<IRegisterFields>({
    username: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const resetMsgs = () => {
    setErrMsg("");
    setSuccess("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof IRegisterFields
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMsgs();
    await authService
      .register(fields)
      .then(() => {
        setSuccess("Account created successfully!");
      })
      .catch((err) => {
        const errs = err.response.data.errors;
        if (err.status === 400 && Array.isArray(errs)) {
          const msg = errs.map((e) => e.message).join("\n");
          setErrMsg(msg);
        } else setErrMsg("An error occurred. Please try again.");
        setFields({ username: "", email: "", password: "" });
      });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Create an Account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sign up to start shortening your URLs
        </p>
      </div>
      {errMsg && <Alert variant="destructive">{errMsg}</Alert>}
      {success && <Alert>{success}</Alert>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => handleChange(e, "username")}
            id="username"
            value={fields.username}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => handleChange(e, "email")}
            id="email"
            value={fields.email}
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => handleChange(e, "password")}
            id="password"
            value={fields.password}
            type="password"
            placeholder="Create a password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
