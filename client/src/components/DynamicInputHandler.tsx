"use client";

import revalidateTagServer from "@/app/actions/actions";
import { updateProject } from "@/app/actions/project";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
  defaultValue: string;
  className?: string;
  fieldName: string;
  id: string;
  tag:string;
  updateFunction: (id: string, payload: any) => Promise<any>;
};

function DynamicInputHandler({
  defaultValue,
  className,
  fieldName,
  id,
  tag,
  updateFunction,
}: Props) {
  const params = useParams();
  const [value, setValue] = useState(defaultValue);

  const [isEditing, setIsEditing] = useState(false);

  const updateValue = async (newValue: string) => {
    // return;
    // call the api
    const data = await updateFunction(params[id] as string, {
      [fieldName]: newValue,
    });
    console.log("data we got:", data);
    const { success } = data;
    if (success) {
      console.log("data updated successfully");
      revalidateTagServer(tag);
    }
  };

  useEffect(() => {
    if (value && value !== defaultValue) {
      console.log("something changed... updating ");
      updateValue(value);
    }
  }, [isEditing]);

  return (
    <div className="">
      {isEditing && (
        <>
          <Input
            onChange={(e) => setValue(e.target.value)}
            defaultValue={defaultValue}
            value={value}
            onBlur={() => setIsEditing(false)}
            autoFocus={true}
            className={cn(" border-2 border-primary py-[0.45rem] px-2 h-auto ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",className)}
          />
        </>
      )}

      {!isEditing && (
        <p
          className={cn(
            "border border-transparent p-2",
            !isEditing && "hover:border-gray-300 rounded-xl",
            className
          )}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value || defaultValue}
        </p>
      )}
    </div>
  );
}

export default DynamicInputHandler;
