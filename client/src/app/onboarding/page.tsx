import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const step = searchParams?.step || 1;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  return (
    <div>
      Welcome Onboarding {session.user.name}
      on step: {step}!
    </div>
  );
}
