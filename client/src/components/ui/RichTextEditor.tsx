"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props extends ReactQuillProps {
  value: string;
  setValue: (val: string) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  className: string;
}
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};
const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
];

export function RichTextEditor({
  value,
  setValue,
  isEditing,
  setIsEditing,
  className,
  ...props
}: Props) {
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing && (
        <ReactQuill
          theme="snow"
          style={{ border: "none!important" }}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          onBlur={handleBlur}
          {...props}
        />
      )}
    </div>
  );
}
