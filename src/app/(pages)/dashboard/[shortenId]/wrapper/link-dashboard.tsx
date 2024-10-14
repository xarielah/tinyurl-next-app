"use client";

import GenericLoading from "@/app/app-components/core/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as shortenService from "@/services/shorten.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
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
import {
  type ClicksOverTime,
  type CountryDistribution,
  type ReportsResult,
  type ShortURLEvent,
} from "./report-models";
import { clicksByCountryArray, clicksByDateArray } from "./utils";

const countryDistMock = [
  { country: "USA", clicks: 45 },
  { country: "UK", clicks: 30 },
  { country: "Canada", clicks: 25 },
  { country: "Germany", clicks: 20 },
  { country: "France", clicks: 15 },
  { country: "Japan", clicks: 10 },
  { country: "Australia", clicks: 5 },
];

interface ILinkDashboard {
  params: {
    shortenId: string;
  };
}

export default function LinkDashboard({ params }: ILinkDashboard) {
  const { shortenId } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [report, setReport] = useState<ReportsResult | null>(null);
  const [clicksOverTime, setClicksOverTime] = useState<ClicksOverTime[]>([]);
  const [countryDistribution, setCountryDistribution] = useState<
    CountryDistribution[]
  >([]);
  const shortURL = `${window.location.origin}/r/${shortenId}`;

  // Show notfound
  if (!shortenId) return notFound();

  useEffect(() => {
    shortenService
      .getReportsByShortId(shortenId)
      .then((res) => {
        // Set reports data
        setReport(res.data.result);
        // Set clicks over time
        const events = res.data.result.events as ShortURLEvent[];
        const clicksOverTimeData = clicksByDateArray(events);
        setClicksOverTime(clicksOverTimeData);
        // Set country distribution
        const countryDistData = clicksByCountryArray(events);
        console.log("🚀 ~ .then ~ countryDistData:", countryDistData);
        setCountryDistribution(countryDistData);
      })
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <GenericLoading />;
  if (report === null) return notFound();
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
              <strong>Short URL:</strong>{" "}
              <Link href={shortURL}>{shortURL}</Link>
            </p>
            <p>
              <strong>Original URL:</strong>{" "}
              <Link href={report.url}>{report.url}</Link>
            </p>
            <p>
              <strong>Total Clicks:</strong> {report.count}
            </p>
            {report.createdAt && (
              <p>
                <strong>Created On:</strong>{" "}
                {new Date(report.createdAt).toLocaleString("he-IL")}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clicks Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {clicksOverTime.length === 0 && <NoDataToDisplay />}
            {clicksOverTime && clicksOverTime.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clicksOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#291749" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Country Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            {countryDistribution.length === 0 && <NoDataToDisplay />}
            {countryDistribution && countryDistribution.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#291749" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NoDataToDisplay() {
  return <p className="text-center text-gray-600">No data to display</p>;
}
