import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};
export default function ResizableMain({ left, right }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100vh-56px)] overflow-hidden"
        defaultSize={60}
        maxSize={80}
        minSize={40}
      >
        <ScrollArea className="h-full w-full rounded-md px-4 pt-2">
          {left}
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={40}
        minSize={15}
        maxSize={60}
        className="max-h-[calc(100vh-56px)] overflow-hidden"
      >
        <ScrollArea className="h-full w-full rounded-md px-4 pt-2">
          {right}
        </ScrollArea>
      </ResizablePanel>
      {/* <ResizableHandle /> */}
    </ResizablePanelGroup>
  );
}
