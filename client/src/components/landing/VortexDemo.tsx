import React from "react";
import { Vortex } from "../ui/landing/vortex";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function VortexDemo() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          TeamSyncPro - Project management SaaS
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href={"/auth/signup"} className={cn(buttonVariants({variant: "default",}),"transition duration-200")}>
            Get started
          </Link>
          <Link href={"/auth/signin"} className={cn(buttonVariants({variant: "ghost",}),"transition duration-200 text-white")}>Signin</Link>
        </div>
      </Vortex>
    </div>
  );
}
