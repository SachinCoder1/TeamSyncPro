import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { Progress } from "@/components/ui/progress";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { calculateProgressPercentage } from "@/lib/utils";

export default function Onboarding({ step }: { step: number }) {
  return (
    <div className="">
      <Progress value={calculateProgressPercentage(step, 4)} />
    </div>
  );
}
