"use client";
import { IShortenedURLResult } from "@/app/(pages)/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, Clipboard, ExternalLink, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ICreateUrl {
  result: IShortenedURLResult;
  reset: () => void;
}

export default function CreatedUrl({ result, reset }: ICreateUrl) {
  const [isCopied, setIsCopied] = useState(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Controls the confetti animation duration and ends it smoothly (recycle = confetti)
    setConfetti(true);
    const to = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(to);
  }, []);

  const originalUrl = result.originalUrl;
  const shortenedUrl = `${process.env.NEXT_PUBLIC_REDIRECT_BASE}/${result.shortId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "The shortened URL has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy the URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Confetti recycle={confetti} />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              URL Shortened Successfully!
            </CardTitle>
            <CardDescription className="text-center">
              Your new shortened URL is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Original URL:
              </h3>
              <p className="text-sm break-all">
                <Link href={originalUrl}>{originalUrl}</Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Shortened URL:
              </h3>
              <div className="flex items-center space-x-2">
                <Input value={shortenedUrl} readOnly className="flex-grow" />
                <Button onClick={copyToClipboard} variant="outline" size="icon">
                  {isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}

                  <span className="sr-only">Copy shortened URL</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                URL Dashboard
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Shortened URL
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
