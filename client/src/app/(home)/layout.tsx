import Sidebar from "@/components/Sidebar";
import ResizableMain from "@/components/home/ResizableMain";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="lg:block hidden">
        <ResizableMain>
          <div className="">{children}</div>
        </ResizableMain>
      </div>
      <div className="lg:hidden block">
        {/* <MySidebar /> */}
        <div className="">{children}</div>
      </div>
    </div>
  );
}
