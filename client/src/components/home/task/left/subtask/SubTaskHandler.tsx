"use client";

import revalidateTagServer from "@/app/actions/actions";
import { createSubTask } from "@/app/actions/task";
import { Icons } from "@/components/Icon/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubTaskFormSchema } from "@/lib/zod-validation/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  taskId: string;
};

type FormValues = {
  title: string;
};
const SubTaskHandler = ({ taskId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SubTaskFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await createSubTask(taskId, data.title);
    if (res.success) {
      revalidateTagServer("subtasks");
    }
    setIsEditing(false);
    setIsLoading(false);
  });
  const resetHandler = () => {
    setIsEditing(false);
    clearErrors();
  };
  return (
    <div>
      {isEditing && (
        <form className="px-2" onSubmit={onSubmit}>
          <div className="mt-4 mb-2 space-y-1">
            <Label htmlFor="subtask">Add Subtask</Label>
            <Input
              autoFocus={true}
              type="text"
              placeholder="What nees to be done?"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors?.title.message}</p>
            )}
          </div>

          <div className="w-full flex justify-end gap-x-2">
            <Button disabled={isLoading} type="submit" size={"sm"}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
            <Button onClick={resetHandler} size={"sm"} variant={"ghost"}>
              Cancel
            </Button>
          </div>
        </form>
      )}
      {!isEditing && <div className="border-t mb-2 -mt-2"></div>}
      <Button
        onClick={() => setIsEditing(true)}
        size={"sm"}
        className="!font-normal"
        variant={"outline"}
      >
        <PlusIcon className="h-4 w-4 !font-normal" /> Add Subtask
      </Button>
    </div>
  );
};

export default SubTaskHandler;
