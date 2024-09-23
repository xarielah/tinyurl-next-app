import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, ExternalLink } from "lucide-react";

// This is mock data. In a real application, you would fetch this data from your backend.
const mockLinks = [
  {
    id: 1,
    originalUrl: "https://www.example.com/very/long/url/1",
    shortUrl: "https://short.link/abc123",
    clicks: 42,
  },
  {
    id: 2,
    originalUrl: "https://www.example.com/another/long/url/2",
    shortUrl: "https://short.link/def456",
    clicks: 17,
  },
  {
    id: 3,
    originalUrl: "https://www.example.com/yet/another/long/url/3",
    shortUrl: "https://short.link/ghi789",
    clicks: 8,
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Your Shortened Links
      </h1>
      <div className="flex space-x-2">
        <Input
          type="url"
          placeholder="Enter a long URL to shorten"
          className="flex-grow"
        />
        <Button type="submit">Shorten</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Original URL</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLinks.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">{link.originalUrl}</TableCell>
              <TableCell>{link.shortUrl}</TableCell>
              <TableCell>{link.clicks}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
