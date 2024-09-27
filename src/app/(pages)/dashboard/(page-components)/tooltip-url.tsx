import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipURL({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{url}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
