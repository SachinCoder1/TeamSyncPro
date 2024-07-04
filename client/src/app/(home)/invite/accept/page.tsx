import { checkInvitation } from "@/app/actions/invite";
import AcceptInvite from "@/components/invitation/AcceptInvite";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams?: {
    invitation_token?: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  const invitation = await checkInvitation(
    searchParams?.invitation_token as string
  );
  if ([404, 409, 400].includes(invitation?.errorCode as number)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-lg w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Invitation already accepted or Invitation has expired
          </h2>
          <p className="text-gray-600">
            Thank you for your interest. If you have any questions, please
            contact support.
          </p>
          <div className="mt-6">
            <Link className={buttonVariants({variant: "link"})} href={"/contact"}>Contact Support</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white px-10 pt-6 pb-4 rounded-xl shadow-xl max-w-lg w-full">
          <h2 className="text-xl text-center mx-auto font-bold text-gray-800 mb-4">
            You've been invited for {invitation.data?.invitedFrom?.name || ""}
          </h2>
          <div className="text-center mb-6">
            {/* <p className="text-gray-600 mb-2">
            Workspace: <span className="font-semibold text-gray-800">{invitation.data?.invitedFrom?.name || ""}</span>
          </p> */}
            <p className="text-gray-600">
              Invited by:{" "}
              <span className="font-semibold text-gray-800">
                {invitation.data?.invitedFrom?.name || ""}
              </span>
            </p>
            <div className="mt-8">
              <AcceptInvite invitationToken={searchParams?.invitation_token} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center h-screen w-full">

      <div className="mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Accept Invitation</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold">
            {invitation.data?.workspace?.name || ""}
          </p>
          <p className="text-gray-600">
            Invited by {invitation.data?.invitedFrom?.name || ""}
          </p>
        </div>
        <div className="">
        <AcceptInvite invitationToken={searchParams?.invitation_token} />

        </div>
      </div>

      </div> */}

      {/* <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Accept Invitation</h1>
          <p id="statusMessage" className="text-gray-700">
            Please wait while we process your invitation acceptance.{" "}
            {searchParams?.invitation_token}
          </p>
          <AcceptInvite invitationToken={searchParams?.invitation_token} />
        </div>
      </div> */}
    </div>
  );
};

export default Page;
