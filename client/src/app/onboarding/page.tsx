import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Onboarding from "@/components/onboarding";
import { Heading, Typography } from "@/components/ui/typography";
import { MoveLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import OnboardForm from "@/components/forms/OnboardForm";
import { getServerAuth } from "@/lib/auth";
import Preview from "@/components/onboarding/Preview";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (![1, 2, 3].includes(Number(searchParams?.step))) {
    redirect("/onboarding?step=1");
  }
  const step = Number(searchParams?.step) || 1;
  const session = await getServerAuth();
  return (
    <div className="flex gap-y-4 gap-x-8 ml-24 my-6">
      <div className="w-1/3 flex items-start gap-x-2 relative">
        <div className="absolute left-[-3.5rem] top-2 transform -translate-y-1/2">
          {step > 1 && (
            <Link
              className={cn(buttonVariants({ variant: "ghost" }), "")}
              href={
                Number(step) - 1 < 1
                  ? ""
                  : `/onboarding/?step=${Number(step) - 1}`
              }
            >
              <MoveLeftIcon size={20} className="text-primary" />
            </Link>
          )}
        </div>

        <div className="space-y-4">
          <Onboarding step={step} />

          <Heading variant="h2" className="font-normal">
            Let's Setup your First project
          </Heading>
          <Typography variant="lead">
            This is a simple onboarding process to help you get started with
            your first project.
          </Typography>

          <OnboardForm step={step} />
        </div>
      </div>

      <div className="border flex-1 mt-10">
        <Preview step={step} />
      </div>
    </div>
  );
}
