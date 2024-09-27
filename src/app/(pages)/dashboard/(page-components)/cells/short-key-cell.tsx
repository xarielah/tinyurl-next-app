import { Row } from "@tanstack/react-table";
import { ShortenLink } from "../data-table.types";

interface IShortKeyCell {
  row: Row<ShortenLink>;
}

export default function ShortKeyCell({ row }: IShortKeyCell) {
  return <div className="lowercase">{row.getValue("shortId")}</div>;
}
