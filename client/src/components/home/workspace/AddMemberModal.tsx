"use client";

import revalidateTagServer from "@/app/actions/actions";
import { inviteToWorkspace } from "@/app/actions/invite";
import { Icons } from "@/components/Icon/Icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { toast } from "sonner";

type Props = {
  workspaceName?: string;
  workspaceId: string;
  buttonTrigger?: React.ReactNode;
};

const AddMemberModal = ({
  workspaceId,
  workspaceName,
  buttonTrigger,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const handleMembersAdd = async () => {
    setLoading(true);
    console.log("added emails: ", selected);
    const emails = selected.map((item) => item.value);
    console.log("emails: ", emails);
    const isAdded = await inviteToWorkspace(workspaceId, emails);
    if (isAdded.success) {
      handleReset();
      revalidateTagServer("invitations")
      return;
    }

    toast("Something went wrong")
  };

  const handleReset = () => {
    setOpen(false);
    setLoading(false);
    setSelected([]);
  };

  const onAdd = useCallback(
    async (newTag: any) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    async (tagIndex: any) => {
      const tagToRemove = selected[tagIndex];
      setSelected(selected.filter((_: any, i: any) => i !== tagIndex));
      console.log("tag to remove: ", tagToRemove);

      console.log("removing:", tagIndex);
    },
    [selected]
  );
  function isValidEmail(value: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const onValidate = useCallback((value: any) => isValidEmail(value), []);

  return (
    <div>
      <ResponsiveModal
        open={open}
        setOpen={setOpen}
        title={`Invite people to ${workspaceName}`}
        description=""
      >
        <Label>Email addresses</Label>
        <ReactTags
          labelText="e.g. john@company.com"
          placeholderText="e.g. john@company.com"
          selected={selected || []}
          suggestions={[]}
          // ref={api}
          onAdd={onAdd}
          onDelete={onDelete}
          noOptionsText="No emails found"
          allowNew
          ariaDescribedBy="custom-tags-description"
          // collapseOnSelect
          id="custom-tags-demo"
          onValidate={onValidate}
          activateFirstOption={true}
          allowBackspace={true}
          // onCollapse={() => setToggleEditor(false)}
        />
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
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-2 ml-1 cursor-pointer hover:bg-secondary rounded-md px-2 py-2"
      >
        {buttonTrigger}
      </div>
    </div>
  );
};

export default AddMemberModal;
