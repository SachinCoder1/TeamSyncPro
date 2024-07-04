"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BuildingIcon, PlusIcon } from "lucide-react";
import MyWorkspacesCard from "../Navbar/MyWorkspacesCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  id: string;
  selected: string;
  workspaces?: { _id: string; name: string }[];
};

const Workspaces = ({ id, name, selected, workspaces }: Props) => {
  const router = useRouter();
  const [accordionOpen, setAccordionOpen] = useState("");

  const handleAccordionCollapse = () => {
    setAccordionOpen("");
  };

  const handleAccordionExpand = (value: string) => {
    if (accordionOpen) {
      handleAccordionCollapse();
      return;
    }
    setAccordionOpen(value);
  };

  const handleAddWorkspace = () => {
    handleAccordionCollapse();
    router.push("/workspace/new");
  };

  return (
    <div>
      <Accordion
        collapsible
        type="single"
        className="space-y-2"
        value={accordionOpen}
      >
        <AccordionItem value={id} className="border-none">
          <AccordionTrigger
            className={cn(
              "flex items-center gap-x-2 rounded-md p-1.5 text-start no-underline transition hover:bg-secondary hover:no-underline",
              id === selected && "text-primary"
            )}
            onClick={() => handleAccordionExpand(id)}
          >
            <div className="flex items-center gap-x-2">
              <div className="relative h-7 w-7">
                <BuildingIcon size={20} />
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 text-neutral-700">
            {workspaces?.map((item, index) => (
              <div
                key={`${item._id}:${index}`}
                onClick={handleAccordionCollapse}
              >
                <MyWorkspacesCard
                  key={item._id}
                  selectedWorkspace={selected}
                  item={item}
                />
              </div>
            ))}

            <Button
              variant={"ghost"}
              onClick={handleAddWorkspace}
              className={cn(
                "w-full justify-between items-center gap-x-2 px-2 text-sm font-normal"
              )}
            >
              <div className="flex gap-x-2">
                {/* <BuildingIcon size={20} /> */}
              <PlusIcon size={20} className="text-muted-foreground" />
                New workspace
              </div>
            </Button>

            {/* <Button
              variant={"ghost"}
              className="flex gap-x-2"
              onClick={handleAddWorkspace}
            >
              <PlusIcon size={20} className="text-muted-foreground" /> New
              workspace
            </Button> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Workspaces;
