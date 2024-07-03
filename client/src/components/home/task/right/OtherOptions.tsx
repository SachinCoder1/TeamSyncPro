"use client";

import React, { useState } from "react";
import { EllipsisIcon } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "@/components/ui/DeleteModal";
import { cloneTask, deleteTask } from "@/app/actions/task";
import { useParams, useRouter } from "next/navigation";
import revalidateTagServer from "@/app/actions/actions";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubTaskFormSchema } from "@/lib/zod-validation/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icon/Icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type Props = {
  taskTitle: string;
  isRedirect? : boolean;
  taskId?: string;
};

type FormValues = {
  title: string;
};

export default function OtherOptions({ taskTitle,taskId,isRedirect=true }: Props) {
  const params = useParams();
  const router = useRouter();
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SubTaskFormSchema),
  });

  const handleDeleteConfirmClick = async () => {
    setLoading(true);
    console.log("deleting");

    const isDeleted = await deleteTask(taskId || params?.task as string);
    console.log("deleted....", isDeleted)
    if (isDeleted.success) {
      revalidateTagServer("project");
      setLoading(false);
      setShowDeleteDialog(false);
      toast("Task Deleted Successfully", {
        description: isRedirect ? "Please wait while we redirect you" : "",
      });
      if(isRedirect){
        setTimeout(() => {
          router.push(`/home/${params.workspace}/${params.project}`);
        }, 500);
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await cloneTask(taskId || params?.task as string, data.title);
    if (res.success) {
      revalidateTagServer("project");
      console.log("res:", res.data);
      toast("Cloning complete", {
        duration: 7000,
        description:
          "You can find the cloned task in the list or by clicking the link below",
        action: {
          label: "Open cloned issue",
          onClick: () =>
            router.push(
              `/home/${params.workspace}/${params.project}/${res.data?._id}`
            ),
        },
      });
      resetHandler();
    }
  });
  const resetHandler = () => {
    clearErrors();
    setLoading(false);
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-10 !-mt-1 !w-max !p-0 !px-0 !py-0">
          <Button
            className="w-full justify-start rounded-none"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setIsOpen(true)}
          >
            Clone
          </Button>
          <Separator />
          <Button
            className="w-full justify-start text-destructive rounded-none"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Task
          </Button>
        </PopoverContent>
      </Popover>

      <ResponsiveModal
        open={open}
        setOpen={setIsOpen}
        title="Clone task"
        description="This will clone everything the task have except the id"
      >
        <form
          onSubmit={onSubmit}
          className={cn("grid items-start gap-4 relative]")}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">title</Label>
            <Input
              autoFocus={true}
              defaultValue={`Clone - ${taskTitle}`}
              {...register("title")}
              placeholder="What's in your mind?"
              className="z-[99999999]"
            />
          </div>
          <div className="flex items-start justify-end w-full">
            <Button className="w-full md:w-fit" disabled={loading} type="submit">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Clone Task
            </Button>
          </div>
        </form>
      </ResponsiveModal>

      <DeleteModal
        description="This action cannot be undone. This task will no longer be accessible by you or others you've shared it with."
        title="Delete this Task?"
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        handleClick={handleDeleteConfirmClick}
        isLoading={loading}
      />
    </>
  );
}
