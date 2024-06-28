import React from "react";
import { Heading } from "../ui/typography";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  heading?: string;
  className?: string;
};

const HeadingCard = ({ heading, className, children }: Props) => {
  return (
    <div className="border rounded-md py-4">
      <Heading variant="h4" className="px-4">
        {heading}
      </Heading>

      <div className={cn("mt-4", className)}>{children}</div>
    </div>
  );
};

export default HeadingCard;
