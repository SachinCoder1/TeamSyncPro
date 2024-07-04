"use client";

import { acceptInvitation } from "@/app/actions/invite";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../Icon/Icons";
import { useSession } from "next-auth/react";
import revalidateTagServer from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSelectedWorkspace } from "@/app/actions/user";

type Props = {
  invitationToken?: string;
};

const AcceptInvite = ({ invitationToken }: Props) => {
  const { update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleAcceptInvitation = async () => {
    if (!invitationToken) return;
    setLoading(true);
    const isAccepted = await acceptInvitation(invitationToken);
    if (isAccepted.success) {
    }
    await update({
      info: isAccepted.data.workspace._id
    })
      .then((item) => {
      })
      .catch((err) => {
      });
    // await update();
    // const reloadSession = () => {
    //     const event = new Event('visibilitychange');
    //     document.dispatchEvent(event)
    // }
    // reloadSession();
    updateSelectedWorkspace(isAccepted.data.workspace._id)
    revalidateTagServer("workspace");
    setLoading(false);
    toast.success("Invitation Accepted", {
        description: "Please wait while we redirect you"
    })
    sessionStorage.removeItem("invitationToken")
    router.push(`/workspace`)
  };
  return (
    <div>
      <Button className="w-full" onClick={handleAcceptInvitation} disabled={loading}>
        {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Accept Invitation
      </Button>
    </div>
  );
};

export default AcceptInvite;
