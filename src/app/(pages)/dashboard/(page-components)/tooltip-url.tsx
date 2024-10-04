import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TooltipURL({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="truncate flex items-center gap-2">
            <ExternalLink
              size="14"
              className="duration-200 ease-in-out flex-shrink-0 peer-hover:opacity-100 hover:opacity-100 inline opacity-0"
            />
            <Link href={url} target="_blank" className="peer">
              {url}
            </Link>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
