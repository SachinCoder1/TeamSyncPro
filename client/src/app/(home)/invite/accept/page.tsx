import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams?: {
    invitation_token? : string;
  }
};

const Page = async ({searchParams}: Props) => {  
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Accept Invitation</h1>
          <p id="statusMessage" className="text-gray-700">
            Please wait while we process your invitation acceptance. {searchParams?.invitation_token}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
