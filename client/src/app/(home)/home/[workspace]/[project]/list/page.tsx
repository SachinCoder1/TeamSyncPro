import ProjectList from "@/components/home/project/List";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function Page({}: Props) {
  return (
    <>
      <ProjectList />
    </>
  );
}
