import React from "react";
import Link from "next/link";
import { Vortex } from "../ui/animations/vortex";

export function VortexDemo() {
  return (
    <div className="md:w-[calc(100%-4rem)] w-full mx-auto rounded-md h-[25rem]  md:h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-0 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          The Next Generation DeFi Platform
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Discover the future of decentralized finance. Stake, swap, and earn rewards with ease.

        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href={"/staking"} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Launch app
          </Link>
          <button className="px-4 py-2  text-white ">Learn more</button>
        </div>
      </Vortex>
    </div>
  );
}
