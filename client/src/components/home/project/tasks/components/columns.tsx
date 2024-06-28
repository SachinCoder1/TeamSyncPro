"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { markCompleteIncomplete } from "@/app/actions/task";
import revalidateTagServer from "@/app/actions/actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import Priority from "@/components/home/task/right/Priority";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //     className="translate-y-[2px]"
    //   />
    // ),
    cell: ({ row }) => {
      const completedRows = ["1", "4"];
      const [isSelected, setIsSelected] = useState(
        row.original.done === true
      );
      useEffect(() => {
        row.toggleSelected(isSelected);
      }, [isSelected, row]);

      return (
        <Checkbox
          // checked={row.getIsSelected()}
          checked={isSelected}
          onCheckedChange={async (value) => {
            // console.log("value on change check:", value, "row", row.original);
            // return row.toggleSelected(!!value);
            setIsSelected(!!value);
            const data = await markCompleteIncomplete(row.original.id, !!value);

            console.log("data client:", data);
            if (value === false) {
              console.log("Un selected the task", row.original);
            }
            if (value === true) {
              console.log("selected the task:", row.original);
            }
            revalidateTagServer("project");
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      const params = useParams();

      return (
        <Link
          href={`/home/${params.workspace}/${params.project}/${row.original.id}`}
          // href={`/home/${row.original.id}/`}
          // passHref
        >
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-[500px] truncate font-medium ">
              {row.getValue("title")}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="assignee" />
    ),
    cell: ({ row }) => {
      const { name = "", src = "", id = "" } = row.getValue("assignee") as any;

      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={src || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original?.sectionStatus
      );

      // if (!status) {
      //   return null;
      // }

      return (
        <div className="flex w-[100px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{row.original.status.title}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as any)?.sectionId);
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <Priority priority={priority.value} taskId={row.original.id} />
        // <div className="flex items-center">
        //   {priority.icon && (
        //     <priority.icon color={priority.color} className="mr-2 h-4 w-4 text-muted-foreground" />
        //   )}
        //   <span>{priority.label}</span>
        // </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
