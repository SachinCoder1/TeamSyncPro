"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: any
  }[]
}

export function ProjectNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex md:space-x-4 space-x-2 md:bg-none bg-secondary rounded-xl w-fit p-2 md:p-0",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "border-b-2 border-b-[#6d6e6f] md:!bg-none !bg-background rounded-none rounded-t-xl hover:!bg-none"
              : "border-b-2 border-b-transparent hover:border-b-gray-300 rounded-none rounded-t-xl hover:!bg-none",
            "justify-start !py-1 my-0 h-auto space-x-2 px-2"
          )}
        >
         {item.icon} {item.title}
        </Link>
      ))}
    </nav>
  )
}