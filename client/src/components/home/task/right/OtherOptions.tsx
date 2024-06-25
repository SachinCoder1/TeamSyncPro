"use client";

import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { EllipsisIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import DeleteModal from "@/components/ui/DeleteModal";
import { deleteTask } from "@/app/actions/task";
import { useParams, useRouter } from "next/navigation";
import revalidateTagServer from "@/app/actions/actions";

export default function OtherOptions() {
  const params = useParams();
  const router = useRouter();
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirmClick = async () => {
    setLoading(true);
    console.log("deleting");

    const isDeleted = await deleteTask(params?.task as string);
    if (isDeleted.success) {
      revalidateTagServer("project");
      setLoading(false);
      setShowDeleteDialog(false);
      setTimeout(() => {
        router.push(`/home/${params.workspace}/${params.project}`);
      }, 500);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <EllipsisIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Clone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setShowDeleteDialog(true);
            }}
            className="text-red-600"
          >
            Delete Task
          </DropdownMenuItem>
          <DeleteModal
            description="This action cannot be undone. This task will no longer be accessible by you or others you've shared it with."
            title="Delete this Task?"
            open={showDeleteDialog}
            setOpen={setShowDeleteDialog}
            handleClick={handleDeleteConfirmClick}
            isLoading={loading}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
