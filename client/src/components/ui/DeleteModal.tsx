import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "../Icon/Icons";

type Props = {
  isLoading?: boolean;
  open: boolean;
  setOpen: (bool: boolean) => void;
  triggerBtn?: React.ReactNode;
  title: string;
  description: string;
  handleClick: any;
};

const DeleteModal = ({
  open,
  setOpen,
  triggerBtn,
  title,
  description,
  handleClick,
  isLoading,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{triggerBtn}</DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end w-full gap-x-4">
          <Button
            disabled={isLoading}
            onClick={handleClick}
            variant={"destructive"}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => setOpen(false)}
            variant={"ghost"}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
