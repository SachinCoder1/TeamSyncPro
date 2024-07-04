"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState } from "react";
import { addDependency } from "@/app/actions/task";
import revalidateTagServer from "@/app/actions/actions";
import { DependencyType } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { dependencyType } from "@/data";
import StatusBarDropdown from "../right/StatusPopup";
import Priority from "../right/Priority";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const FormSchema = z.object({
  task: z.string({
    required_error: "Please select a task.",
  }),
  type: z.enum(["IS_BLOCKED_BY", "BLOCKS"]),
});

type Props = {
  taskId: string;
  suggestions?: { label: string; value: string }[];
  dependency?: DependencyType;
  projectId: string;
  workspaceId: string;
};
export default function Dependency({
  taskId,
  suggestions,
  dependency,
  projectId,
  workspaceId
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data: ", data);
    const isAdded = await addDependency(taskId, data.task, data.type);
    if (isAdded.success) {
      revalidateTagServer("task");
      handleReset();
    }
  }

  const handleReset = () => {
    setIsEditing(false);
    form.reset();
    form.clearErrors();
  };

  return (
    <div>
      {!isEditing &&
        (dependency?.by ? (
          <div className="flex gap-x-2 items-center border py-1 px-2 rounded-md justify-between hover:bg-secondary">
            <Link
              href={`/home/${projectId}/${dependency?.task._id}`}
              // href={`/home/${row.original.id}/`}
              className=""
              // passHref
            >
              <div className="flex space-x-2">
                {dependency?.by && (
                  <Badge variant={"outline"}>
                    {dependencyType[dependency.by]?.label}
                  </Badge>
                )}{" "}
                <span className="truncate font-medium max-w-[150px] ">
                  {dependency?.task.title}
                </span>
              </div>
            </Link>

            <div className="flex gap-x-2 items-center">
              <Priority
                priority={dependency.task.priority}
                taskId={dependency.task._id}
              />
              <StatusBarDropdown
                taskId={dependency.task._id}
                status={dependency.task.status}
              />
            </div>
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            {" "}
            <Badge variant={"secondary"}>None</Badge>{" "}
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-4 gap-x-2 items-center">
              <FormField
                control={form.control}
                defaultValue="IS_BLOCKED_BY"
                name="type"
                render={({ field }) => (
                  <FormItem defaultValue={"IS_BLOCKED_BY"}>
                    {/* <FormLabel>Email</FormLabel> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={"IS_BLOCKED_BY"}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="BLOCKS">blocks</SelectItem>
                          <SelectItem value="IS_BLOCKED_BY">
                            is blocked by
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-3">
                    {/* <FormLabel>Task</FormLabel> */}
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between !font-normal"
                          >
                            {value ? value : "Search for issues"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search task..." />
                          <CommandEmpty>No tasks found.</CommandEmpty>
                          <CommandList>
                            {suggestions?.map((suggestion) => (
                              <CommandItem
                                value={suggestion.label}
                                key={suggestion.value}
                                onSelect={(currentValue) => {
                                  console.log("selected value: ", currentValue);
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                  form.setValue("task", suggestion.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    suggestion.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {suggestion.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end w-full gap-x-2">
              <Button
                disabled={!form.getValues("type") || !form.getValues("task")}
                type="submit"
                size="sm"
              >
                Submit
              </Button>
              <Button onClick={handleReset} variant={"ghost"} size={"sm"}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
