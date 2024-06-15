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
};

const defaultValue =
  "<p>asfasfasdfsaf</p><p><strong>safasdfsadfdasfsafasdfs</strong></p>";

function DescriptionHandler({  description }: Props) {
  const params = useParams();

  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const updateValue = async (newValue: string) => {
    const sanitizedVal = DOMPurify.sanitize(newValue);
    // call the api
    const data = await updateProject(params?.project as string, {
      description: sanitizedVal,
    });
    console.log("data we got:", data);
    const {success} = data;
    if(success){
      console.log("data updated successfully")
      revalidateTagServer('project');
    }
  };

  useEffect(() => {
    if (value && value !== description) {
      console.log("something changed... updating ");
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
            className={cn("border-2", isEditing && "border-primary rounded-xl")} // flex flex-col-reverse to make the options bottom
            placeholder="What's in your mind?"
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
            "border border-transparent p-2 min-h-[200px]",
            !isEditing && "hover:border-gray-300 rounded-xl"
          )}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(value || description || ""),
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
