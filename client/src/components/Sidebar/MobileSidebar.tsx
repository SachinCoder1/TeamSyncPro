"use client";

import React, { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { HomeIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headingClasses } from "../ui/typography";

type Props = {
    children: React.ReactNode;
};

const MobileSidebar = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Drawer direction="left" onOpenChange={setIsOpen} open={isOpen}>
        <DrawerTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon className="text-muted-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-5/6">
          <div className="h-screen overflow-y-auto">
            <DrawerHeader className="">
              <div className="flex items-center justify-between">
                <Link className={cn(headingClasses["h4"])} href={"/"}>
                  TeamSyncPro
                </Link>
                <DrawerClose>
                  <Button autoFocus variant={"ghost"} size={"icon"}>
                    <XIcon className="text-muted-foreground w-5 h-5" />
                  </Button>
                </DrawerClose>
              </div>
              <div onClick={() => setIsOpen(!isOpen)}>
                {/* <ConnectButton isMobile={true} /> */}
              </div>
            </DrawerHeader>

            <div className="flex flex-col h-full">
              <div className="overflow-x-hidden">
               {children}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileSidebar;
