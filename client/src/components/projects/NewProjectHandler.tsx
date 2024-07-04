"use client";

import revalidateTagServer, { revalidatePathServer } from "@/app/actions/actions";
import { createProject } from "@/app/actions/project";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../Icon/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateProjectSchema } from "@/lib/zod-validation/form-schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { getWorkspace } from "@/app/actions/workspace";

type Props = {
  workspaceId: string;
};

const NewProjectHandler = ({ workspaceId }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(false);
  };

  type FormData = {
    title: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const isCreated = await createProject(data.title);
    if (isCreated.success) {
      toast.success("project created", {
        description: "Please wait while we redirect you...",
      });
    }

    handleReset();
    revalidateTagServer("workspace")
    revalidatePathServer("/(home)", "layout")
    router.push(`/home/${isCreated.project?._id}`);
  });

  return (
    <div className="w-3/6">
      <form onSubmit={onSubmit}>
        <div className="my-2">
          <Label htmlFor="title">Project name</Label>
          <Input
            disabled={loading}
            id="title"
            type="text"
            placeholder="e.g. frontend"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors?.title.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading || !!errors.title}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create project
        </Button>
      </form>
    </div>
  );
};

export default NewProjectHandler;
