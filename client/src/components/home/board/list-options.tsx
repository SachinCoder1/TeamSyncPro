"use client";

// import { List } from '@prisma/client'
import { MoreHorizontal, PlusIcon, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PopoverClose } from "@radix-ui/react-popover";
import { copySection, deleteSection } from "@/app/actions/section";
import revalidateTagServer from "@/app/actions/actions";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteModal from "@/components/ui/DeleteModal";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Icons } from "@/components/Icon/Icons";
// import { trpc } from '@/trpc/client'

type ListOptionsProps = {
  data: any;
  refetchLists: any;
  onAddCart: () => void;
  setEnableRename: (bool: boolean) => void;
};

export function ListOptions({
  data,
  refetchLists,
  onAddCart,
  setEnableRename,
}: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = async () => {
    setLoading(true);
    console.log("data:", data);
    const isCopied = await copySection(data.project, data._id);
    console.log("is copied:", isCopied);
    if (isCopied.success) {
      toast.success("Section copied");
      revalidateTagServer("project");
      setOpen(false);
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    console.log("data:", data);
    const isDeleted = await deleteSection(data.project, data._id);
    console.log("is deleted:", isDeleted);
    if (isDeleted.success) {
      toast.success("Section deleted");
      setShowDeleteDialog(false);
      setLoading(false);
      revalidateTagServer("project");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center">
        <Button
          onClick={onAddCart}
          className="h-auto w-full justify-start rounded-none p-2 text-sm font-normal"
          variant="ghost"
        >
          {/* <TooltipWrapper
            trigger={}
          > */}
            <PlusIcon size={20} className="text-muted-foreground" />
          {/* </TooltipWrapper> */}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-auto w-auto p-2" variant="ghost">
              {/* <TooltipWrapper trigger={<MoreHorizontal className="h-4 w-4" />}> */}
              <MoreHorizontal className="h-4 w-4" />
              {/* </TooltipWrapper> */}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="px-0 pb-3 pt-3"
            side="bottom"
            align="start"
          >
            <div className="pb-2 pl-4 text-left text-sm font-medium text-neutral-600">
              Actions
            </div>
            <PopoverClose asChild ref={closeRef}>
              <Button
                className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                variant="ghost"
              >
                {/* <TooltipWrapper trigger={<X className="h-4 w-4" />}> */}
                  Close
                {/* </TooltipWrapper> */}
              </Button>
            </PopoverClose>

            <Button
              onClick={onAddCart}
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
              variant="ghost"
            >
              Add task...
            </Button>
            <Button
              onClick={() => setEnableRename(true)}
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
              variant="ghost"
            >
              Rename section...
            </Button>
            <Button
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
              variant="ghost"
              // disabled={isLoadingCopy}
              onClick={() => setOpen(true)}
            >
              Copy this section
            </Button>
            <Separator />
            <Button
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-destructive hover:text-destructive"
              variant="ghost"
              // disabled={isLoadingDelete}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete this section
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <DeleteModal
        description="This action cannot be undone. This section will no longer be accessible by you or others you've shared it with."
        title="Delete this section?"
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        handleClick={onDelete}
        isLoading={loading}
      />

      <ResponsiveModal
        open={open}
        setOpen={setOpen}
        title="Copy this section"
        description="This will copy everything the section have except the id"
      >
        <div className="flex items-start justify-end w-full">
          <Button className="w-full md:w-fit" disabled={loading} onClick={onCopy}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Copy section
          </Button>
        </div>
      </ResponsiveModal>
    </div>
  );
}
