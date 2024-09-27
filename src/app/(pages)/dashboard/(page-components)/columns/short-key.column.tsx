import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { ShortenLink } from "../data-table.types";

interface IShortKeyColumn {
  column: Column<ShortenLink, unknown>;
}

export default function ShortKeyColumn({ column }: IShortKeyColumn) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Short Key
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
