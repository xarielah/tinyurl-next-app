"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const clicksOverTime = [
  { date: "2023-06-01", clicks: 10 },
  { date: "2023-06-02", clicks: 15 },
  { date: "2023-06-03", clicks: 8 },
  { date: "2023-06-04", clicks: 20 },
  { date: "2023-06-05", clicks: 12 },
  { date: "2023-06-06", clicks: 18 },
  { date: "2023-06-07", clicks: 25 },
];

const countryDistribution = [
  { country: "USA", clicks: 45 },
  { country: "UK", clicks: 30 },
  { country: "Canada", clicks: 25 },
  { country: "Germany", clicks: 20 },
  { country: "France", clicks: 15 },
  { country: "Japan", clicks: 10 },
  { country: "Australia", clicks: 5 },
];

export default function ShortenDashboard({ params }: any) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter">Link Dashboard</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Links
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Short URL:</strong> https://short.link/{params.linkId}
            </p>
            <p>
              <strong>Original URL:</strong>{" "}
              https://www.example.com/very/long/url
            </p>
            <p>
              <strong>Total Clicks:</strong> 150
            </p>
            <p>
              <strong>Created On:</strong> June 1, 2023
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clicks Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={clicksOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Country Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
