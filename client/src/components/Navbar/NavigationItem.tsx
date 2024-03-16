// NavigationItem.js
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SquareCheckBig } from "lucide-react";
import dynamic from 'next/dynamic'

type Props = {
  link: {
    title: string;
    href: string;
    children: {
      title: string;
      description: string;
      href: string;
    }[];
    asChild?: {
      title: string;
      description: string;
      href: string;
    };
  };
};

export const NavigationItem = ({ link }: Props) => {
  const isSimpleLink = !link.children || link.children.length === 0;

  return (
    <NavigationMenuItem key={link.title}>
      {isSimpleLink ? (
        <Link href={link.href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {link.title}
          </NavigationMenuLink>
        </Link>
      ) : (
        <>
          <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {link.asChild && (
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={link.asChild.href}
                    >
                      <SquareCheckBig />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {link.asChild.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {link.asChild.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              )}
              {link.children.map((child) => (
                <ListItem
                  key={child.title}
                  href={child.href}
                  title={child.title}
                >
                  {child.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      )}
    </NavigationMenuItem>
  );
};

type ListItemProps = {
  className?: string;
  title: string;
  children: string;
  href: string;
};

export const ListItem = React.forwardRef(
  ({ className, title, children, href }: ListItemProps, ref: any) => (
    <li>
      <Link href={href} passHref legacyBehavior>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="line-clamp-2 text-sm">{children}</p>
        </a>
      </Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
