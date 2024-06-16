"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  if(!isEditing) return null;
  const handleBlur = () => {
    setIsEditing(false);
  };
  
  return (
    <div className="relative">
      {isEditing && (
        <ReactQuill
          theme="snow"
          style={{borderRadius: "20px", minWidth: "200px"}}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          onBlur={handleBlur}
          className={className}
          {...props}
        />
      )}
    </div>
  );
}
