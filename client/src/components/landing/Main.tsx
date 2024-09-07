import React from "react";
import { BackgroundBeamsWithCollision } from "../ui/animations/background-beams-with-collision";
import { TextHoverEffect } from "../ui/animations/text-hover-effect";
import { TypewriterEffectSmooth } from "../ui/animations/typewriter-effect";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Main() {
  return (
    <BackgroundBeamsWithCollision className="flex flex-col">
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        What&apos;s smarter than Projects?
        <div className="relative mx-auto w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          {/* <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <p className="">Dynamic teamwork.</p>
          </div> */}
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <p className="">Dynamic teamwork.</p>
          </div>
          {/* <TextHoverEffect text="TeamSyncPro" /> */}
        </div>
      </h2>
      <div className="flex items-center gap-x-4 flex-row py-6">
        <Link
          href={"/auth/signin"}
          className={cn(buttonVariants({
            size: "sm",
            variant: "outline",
          }), "w-32 rounded-xl  text-sm")}
        >
          Login
        </Link>
        <Link
          href={"/auth/signup"}
          className={cn(buttonVariants({
            size: "sm",
          }), "w-32 md:w-40 rounded-xl  text-sm")}
        >
          Get started <ArrowRight className="ml-1.5 h-5 w-5" />
        </Link>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
