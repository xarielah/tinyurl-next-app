"use state";
import DeleteURLDialog from "@/app/app-components/shorten/delete-url-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { ShortenLink } from "./data-table.types";

interface IActionsCell {
  row: Row<ShortenLink>;
}

export default function ActionsCell({ row }: IActionsCell) {
  const [isOpen, setIsOpen] = useState(false);
  const link = row.original;
  const openAlert = () => setIsOpen(true);
  const { toast } = useToast();
  const copyLink = () => {
    navigator.clipboard.writeText(link.shortId);
    toast({
      title: "Copied!",
      description: "The shortened url has been copied to your clipboard.",
    });
  };
  return (
    <>
      <DeleteURLDialog
        linkId={link.id}
        alertOpen={isOpen}
        setAlertOpen={(val) => setIsOpen(val)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={copyLink}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem>Visit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuItem>Analytics</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 hover:text-red-600"
            onClick={openAlert}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
