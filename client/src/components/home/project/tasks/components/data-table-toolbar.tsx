"use client"

import { CrossIcon } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

import { priorities } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { StatusType } from "@/types/project"
import { getAllStatus } from "@/app/actions/project"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const params = useParams();
  const { data, error, isLoading } = useSWR<{
    success: boolean;
    data?: StatusType[];
  }>(
    params.project ? `/status/${params.project}` : null,
    () => getAllStatus(params.project as string),
    // { revalidateOnFocus: false, revalidateOnMount: false }
  );

  const statuses = data?.data?.map((item) => (
    {
      label: item.title,
      value: item._id,
    }
  ))


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && statuses && statuses.length > 0 && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
