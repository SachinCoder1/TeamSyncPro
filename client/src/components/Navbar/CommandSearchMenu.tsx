"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  Calculator,
  Calendar,
  CreditCard,
  SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ProjectType } from "@/stores/workspace-store";
import { SquareFilledIcon } from "../Sidebar/menu/ProjectMenu";
import Link from "next/link";

type Props = {
  projects?: ProjectType[];
  workspaceId: string;
};
export default function CommandSearchMenu({ workspaceId, projects }: Props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [projectItems, setProjectItems] = React.useState<ProjectType[] | []>(
    []
  );

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (projects?.length) {
      setProjectItems(projects);
    }
  }, [projects]);

  const debouncedSearch = useDebouncedCallback((term) => {
    setLoading(true);

    console.log(`Searching... ${term}`);
    if (!term && projects) {
      setProjectItems(projects);
    } else {
      const filteredProjects = projects?.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );

      // if (filteredProjects && filteredProjects?.length > 0) {
      //   setProjectItems(filteredProjects);
      // } else {
      // }
    }

    setLoading(false);
  }, 300);

  const handleSearch = (val: string) => {
    setSearch(val); // Update the search value immediately
    debouncedSearch(val); // Debounce the API call
  };

  return (
    <>
      {/* </p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-[400px]" asChild>
          <Button
            className="flex justify-between items-center text-muted-foreground"
            variant={"outline"}
            size={"sm"}
          >
            <div className="flex items-center gap-x-2">
              <SearchIcon className="text-muted-foreground w-4 h-4" /> Search
            </div>

            <p className="text-sm text-muted-foreground">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>J
              </kbd>
            </p>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="px-0 w-[400px]">
          {/* <CommandDialog open={open} onOpenChange={setOpen}> */}
          <Command>
            <CommandInput
              value={search}
              onValueChange={handleSearch}
              placeholder="Type a command or search..."
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {projectItems?.map((item, index) => (
                  <Link href={`/home/${workspaceId}/${item._id}`}>
                    <CommandItem
                      onSelect={(value) => {
                        setOpen(false);
                      }}
                      // value={item._id}
                      className="gap-x-2"
                    >
                      <SquareFilledIcon color={item.color} />
                      <span>{item.name}</span>
                      {/* <CommandShortcut>⌘P</CommandShortcut> */}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

          {/* </CommandDialog> */}
        </PopoverContent>
      </Popover>
    </>
  );
}
