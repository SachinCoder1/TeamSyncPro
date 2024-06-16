"use client";

// import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  src?: string;
  name: string;
  label: string;
  id: string;
  role: string;
};

const rolesMap = [
  {
    role: "ADMIN",
    title: "Project Admin",
    description:
      "Full access to change settings, modify, or delete the project.",
  },
  {
    role: "PROJECT_MANAGER",
    title: "Project Manager",
    description: "Can add, edit, and delete anything in the project.",
  },
  {
    role: "MEMBER",
    title: "Member",
    description: " Can add, edit, and delete in the project",
  },
  {
    role: "MODERATOR",
    title: "Moderator",
    description: "Can comment, but can't edit anything in the project.",
  },
  {
    role: "VIEWER",
    title: "Viewer",
    description: "Can view, but can't add comments or edit the project.",
  },
];

export function TeamMembers({ id, name, role, src, label }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleItemSelect = (item: any) => {
    console.log("clicked on:", item.role);
    if (role === "ADMIN") {
      toast({
        title: `Uh oh! Sorry Owner cannot be Changed`,
        variant: "default",
      });
    }
    setOpen(false);
  };
  return (
    <div className="border-none">
      {/* <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader> */}
      {/* <CardContent className="grid"> */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback> {name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
        <Popover open={open}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="ml-auto"
            >
              {role.toLocaleLowerCase()}
              <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onInteractOutside={() => setOpen(false)}
            onFocusOutside={() => setOpen(false)}
            className="p-0"
            align="end"
          >
            <Command>
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  {rolesMap?.map((item, index) => (
                    <CommandItem
                      onSelect={() => handleItemSelect(item)}
                      key={item.role + index}
                      className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                    >
                      <p>{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* </CardContent> */}
    </div>
  );
}
