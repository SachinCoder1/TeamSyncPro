"use client";

import { RichTextEditor } from "@/components/ui/RichTextEditor";
import React, { useState } from "react";
import DOMPurify from "dompurify";

type Props = {};

function DescriptionHandler({}: Props) {
  const [value, setValue] = useState("");
  console.log("value:", value);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const defaultValue =
    "<p>asfasfasdfsaf</p><p><strong>safasdfsadfdasfsafasdfs</strong></p>";

  return (
    <div>
      {isEditing ? (
        <div>
          <RichTextEditor
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            className="border-2"
            placeholder="What's in your mind?"
            value={value}
            setValue={setValue}
          />
        </div>
      ) : (
        <div className=" border border-transparent hover:border-gray-300 p-4">
          <h2>Content Preview</h2>
          <div
            onClick={() => {
              setIsEditing(!isEditing);
              setValue(defaultValue);
            }}
            dangerouslySetInnerHTML={{ __html: value || defaultValue }}
          />
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
