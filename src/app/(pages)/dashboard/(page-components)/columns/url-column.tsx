import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { ShortenLink } from "../data-table.types";

interface IUrlColumn {
  column: Column<ShortenLink, unknown>;
}

export default function UrlColumn({ column }: IUrlColumn) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      URL
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
