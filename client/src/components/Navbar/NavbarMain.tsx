// NavigationMenuDemo.js
"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationItem } from "./NavigationItem";

export function NavigationMenuMain({ navLinks }: any) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((link: any) => (
          <NavigationItem key={link.title} link={link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
