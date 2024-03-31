import Sidebar from "@/components/Sidebar";
import ResizableMain from "@/components/home/ResizableMain";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <ResizableMain>{children}</ResizableMain>
    </div>
  );
}
