"use client";

import revalidateTagServer from "@/app/actions/actions";
import { inviteToWorkspace } from "@/app/actions/invite";
import { Icons } from "@/components/Icon/Icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LabelValueType } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { toast } from "sonner";

type Props = {
  selected: any[];
  setSelected: (val: any) => void;
};

const InviteMembers = ({ selected, setSelected }: Props) => {  
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
      <Label>Email addresses</Label>
      <ReactTags
        labelText="e.g. john@company.com"
        placeholderText="e.g. john@company.com"
        selected={selected || []}
        suggestions={[]}
        // ref={api}
        onAdd={onAdd}
        onDelete={onDelete}
        noOptionsText="Please Enter Valid email"
        allowNew
        ariaDescribedBy="custom-tags-description"
        // collapseOnSelect
        id="custom-tags-demo"
        onValidate={onValidate}
        activateFirstOption={true}
        allowBackspace={true}
        // onCollapse={() => setToggleEditor(false)}
      />
    </div>
  );
};

export default InviteMembers;
