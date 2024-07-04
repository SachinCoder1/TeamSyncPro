"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { updateProject } from "@/app/actions/project";
import { useParams } from "next/navigation";
import revalidateTagServer from "@/app/actions/actions";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

type Props = {
  description: string | undefined;
  updateFunction: (id: string, payload: any) => Promise<any>;
  revalidateTag: string;
  field: string;
  placeholder?: string;
  id: string;
};

const defaultValue =
  "<p>asfasfasdfsaf</p><p><strong>safasdfsadfdasfsafasdfs</strong></p>";

function DescriptionHandler({
  description,
  updateFunction,
  revalidateTag,
  field,
  placeholder,
  id
}: Props) {
  const params = useParams();

  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const updateValue = async (newValue: string) => {
    const sanitizedVal = DOMPurify.sanitize(newValue);
    // call the api
    const payload = { [field]: sanitizedVal };
    const data = await updateFunction(params[id] as string, payload);
    const { success } = data;
    if (success) {
      revalidateTagServer(revalidateTag);
    }
  };

  useEffect(() => {
    if (value && value !== description) {
      updateValue(value);
    }
  }, [isEditing]);

  return (
    <div>
      {isEditing ? (
        <div>
          <RichTextEditor
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            className={cn(
              "border-2",
              isEditing && "border-primary rounded-xl !min-h-52"
            )} // flex flex-col-reverse to make the options bottom
            placeholder={placeholder || "What's in your mind?"}
            value={value}
            setValue={setValue}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            setIsEditing(!isEditing);
            setValue(description || "");
          }}
          className={cn(
            "border border-transparent px-2 py-1 min-h-[100px]",
            !isEditing && "hover:border-gray-300 rounded-xl" 
            // hover:bg-[#EBECF0]
          )}
          dangerouslySetInnerHTML={{
            __html: value || description || placeholder || "What's this project about?",
          }}
        >
          {/* <div dangerouslySetInnerHTML={{ __html: value || defaultValue }} /> */}
        </div>
      )}
      {/* <button
        onClick={() => {
          setIsEditing(!isEditing);
          setValue(defaultValue);
        }}
      >
        edit
      </button> */}
    </div>
  );
}

export default DescriptionHandler;
