"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as authService from "@/services/auth.service";
import AuthRule from "@/wrappers/auth-rule";
import Link from "next/link";
import { useState } from "react";

interface RegisterErrors {
  message: string;
  target: string;
}

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
  const [errMsg, setErrMsg] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const resetMsgs = () => {
    setErrMsg([]);
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
    const payloadBody = {
      username: fields.username,
      email: fields.email,
      password: fields.password,
    };
    await authService
      .registerInternal(payloadBody)
      .then((res) => {
        if (res.status === 201) {
          window.location.replace("/");
          return setSuccess("Account created successfully!");
        } else {
          return Promise.reject(res.data);
        }
      })
      .catch((err) => {
        const possiblyErrorsArray = err.response?.data?.errors;
        if (Array.isArray(possiblyErrorsArray)) {
          const msg = possiblyErrorsArray.map((e: RegisterErrors) => e.message);
          setErrMsg(msg);
        } else setErrMsg(["An error occurred. Please try again."]);
        setFields({ ...fields, password: "" });
      });
  };

  return (
    <AuthRule mustBe="unauthenticated">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Create an Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to start shortening your URLs
          </p>
        </div>
        {errMsg.length > 0 && (
          <Alert variant="destructive">
            <ul className="list-disc pl-4">
              {errMsg.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </Alert>
        )}
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
    </AuthRule>
  );
}
