"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CrossIcon,
  ShieldCloseIcon,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDueDate, removeDueDate } from "@/app/actions/task";
import { useParams } from "next/navigation";
import revalidateTagServer from "@/app/actions/actions";
import { PopoverClose } from "@radix-ui/react-popover";
import { Icons } from "@/components/Icon/Icons";

type Props = {
  taskId: string;
  dueDate: Date;
  isClearButton?: boolean;
};
export default function DueDate({ taskId, dueDate,isClearButton }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  const addDate = async (date: Date) => {
    setDate(date);
    const isAdded = await addDueDate(taskId, date);
    if (isAdded.success) {
      revalidateTagServer("task");
    }
  };
  const removeDate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLoading(true);
    setDate(undefined);
    const isRemoved = await removeDueDate(taskId);
    if (isRemoved.success) {
      revalidateTagServer("task");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-x-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className={cn(
              "justify-start text-left font-normal items-center",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date || dueDate ? (
              format(date || dueDate, "MMM dd")
            ) : (
              <span className="text-xs">No due date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          {/* <PopoverClose> */}

          <div className="flex gap-x-2 items-start">
            <Select
              onValueChange={(value) =>
                setDate(addDays(new Date(), parseInt(value)))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="When do you need it" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>
            {/* <div  className="flex m-1">
          <div className="flex-1"></div>
          <PopoverClose>
            <X  className="text-muted-foreground w-4 h-4" />
          </PopoverClose>
        </div> */}
          </div>

          <div className="rounded-md">
            <Calendar
              components={{
                DayContent: (props) => {
                  return <PopoverClose>{props.date.getDate()}</PopoverClose>;
                },
              }}
              mode="single"
              fromDate={new Date()}
              selected={date || dueDate}
              onSelect={(date) => {
                if (date) {
                  addDate(date as Date);
                }
              }}
              initialFocus
            />
          </div>
          {/* </PopoverClose> */}
        </PopoverContent>
      </Popover>

      {(date || dueDate) && isClearButton && (
        <Button
          variant={"ghost"}
          disabled={isLoading}
          size={"icon"}
          onClick={removeDate}
          title="clear due date"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      )}
    </div>
  );
}
