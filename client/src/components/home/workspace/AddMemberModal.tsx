"use client";

import revalidateTagServer from "@/app/actions/actions";
import { inviteToWorkspace } from "@/app/actions/invite";
import { Icons } from "@/components/Icon/Icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InviteMembers from "@/components/workspace/InviteMembers";
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { toast } from "sonner";

type Props = {
  workspaceName?: string;
  workspaceId: string;
  buttonTrigger?: React.ReactNode;
  setPopOverOpen?: any;
  className?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const AddMemberModal = ({
  workspaceId,
  workspaceName,
  buttonTrigger,
  setPopOverOpen,
  open,
  setOpen,
  className,
}: Props) => {
  // const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleMembersAdd = async () => {
    if (!selected.length) {
      toast.info("Please add atleast one member");
      setLoading(false);
      return;
    }
    setLoading(true);
    const emails = selected.map((item) => item.value);
    const isAdded = await inviteToWorkspace(workspaceId, emails);
    if (isAdded.success) {
      revalidateTagServer("invitations");
      toast.success("Invitations sent to join");
      handleReset();
      return;
    }

    toast("Something went wrong");
    setLoading(false);
  };

  const handleReset = () => {
    setOpen(false);
    setLoading(false);
    setSelected([]);
    if (setPopOverOpen) {
      setPopOverOpen(false);
      setOpen(false);
    }
  };

  return (
    <div className="">
      <ResponsiveModal
        open={open}
        setOpen={setOpen}
        title={`Invite people to ${workspaceName}`}
        description=""
      >
        <div className="grid gap-2">
          <InviteMembers selected={selected} setSelected={setSelected} />
        </div>
        <div className="flex items-start justify-end w-full mt-2">
          <Button
            onClick={handleMembersAdd}
            className="w-full md:w-fit"
            disabled={loading}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </div>
      </ResponsiveModal>
      <div
        onClick={(e) => {
          setOpen(true);
        }}
        className={cn(
          "flex items-center gap-x-2 ml-1 cursor-pointer hover:bg-secondary rounded-md px-2 py-2",
          className
        )}
      >
        {buttonTrigger}
      </div>
    </div>
  );
};

export default AddMemberModal;
