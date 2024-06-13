import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  item: {
    name: string;
    icon?: any;
    path: string;
  };
  className?: string;
};

const MenuLink = ({ item, className }: Props) => {
  return (
    <Link
      href={item.path}
      //   className={`flex gap-x-2 items-center px-2 py-1.5 text-sm font-semibold rounded-md hover:bg-[#404043]`}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex gap-x-2 items-center justify-start px-2 py-1.5 text-sm font-semibold", className
      )}
    >
      {item.icon && <item.icon className="w-4 h-4" />}
      <p>{item.name}</p>
    </Link>
  );
};

export default MenuLink;
