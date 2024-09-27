import { Row } from "@tanstack/react-table";
import { ShortenLink } from "../data-table.types";
import TooltipURL from "../tooltip-url";

interface IUrlCell {
  row: Row<ShortenLink>;
}

export default function UrlCell({ row }: IUrlCell) {
  return (
    <div className="max-w-[50ch] truncate">
      <TooltipURL url={row.getValue("url")} />
    </div>
  );
}
