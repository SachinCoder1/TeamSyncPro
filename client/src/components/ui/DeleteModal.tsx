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

type Props = {
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
          <Button onClick={handleClick} variant={"destructive"}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)} variant={"ghost"}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
