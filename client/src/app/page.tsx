'use client'

import HomeInit from "@/components/home";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function MyHomePage() {
  // const session = await getServerSession(authOptions);
  // if (session && session?.user.workspace) {
  //   return redirect(`/home/${session.user.workspace}`);
  // }
  return (
    <main className="">
      <HomeInit />
    </main>
  );
}
