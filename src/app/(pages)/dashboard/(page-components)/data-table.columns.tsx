"use client";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";
import ShortKeyCell from "./cells/short-key-cell";
import UrlCell from "./cells/url-cell";
import ShortKeyColumn from "./columns/short-key.column";
import UrlColumn from "./columns/url-column";
import { ShortenLink } from "./data-table.types";

export const columns: ColumnDef<ShortenLink>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "url",
    header: UrlColumn,
    cell: UrlCell,
  },
  {
    accessorKey: "shortId",
    header: ShortKeyColumn,
    cell: ShortKeyCell,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
];
