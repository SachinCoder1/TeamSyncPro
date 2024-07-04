"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CreateWorkspaceSchema } from "@/lib/zod-validation/form-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelValueType } from "@/types";
import InviteMembers from "./InviteMembers";
import { Button } from "../ui/button";
import { Icons } from "../Icon/Icons";
import confetti from "canvas-confetti";
import { createWorkspace } from "@/app/actions/workspace";
import revalidateTagServer from "@/app/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateSelectedWorkspace } from "@/app/actions/user";

// const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const count = 200;
const defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio: any, opts: any) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}

const fireConfetti = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

type Props = {};

const NewWorkspace = (props: Props) => {
  const router = useRouter();
  const { update } = useSession();

  const [selected, setSelected] = useState<LabelValueType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const emails = selected.map((item) => item.value);
    console.log("data:", data);
    console.log("emails: ", emails);
    const isCreated = await createWorkspace(data.name, emails);
    console.log("is create:", isCreated);
    if (isCreated.success) {
      await update({
        info: isCreated.workspace?._id,
      })
        .then((item) => {
          console.log("item...", item);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      fireConfetti();
      await updateSelectedWorkspace(isCreated.workspace?._id as string);

      revalidateTagServer("workspace");
      revalidateTagServer("myStarredItems");
      setIsLoading(false);
      toast.success("Workspace created", {
        description: "Please wait while we redirect you",
      });
      router.push(`/workspace`);
    } else {
      toast.error("something went wrong!!", {
        description: "please try again with valid details and permissions",
      });
    }

    setIsLoading(false);
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="w-3/6 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Workspace name</Label>
          <Input
            disabled={isLoading}
            id="name"
            type="name"
            placeholder="Company or Team Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors?.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <InviteMembers selected={selected} setSelected={setSelected} />
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create workspace
        </Button>
      </form>
    </div>
  );
};

export default NewWorkspace;
