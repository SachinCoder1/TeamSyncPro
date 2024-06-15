import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const headingClasses = {
  h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
};

export function Heading({ children, className, variant = "h3" }: HeadingProps) {
  const Tag = variant;
  const classes = cn("scroll-m-20", headingClasses[variant], className);
  return <Tag className={classes}>{children}</Tag>;
}

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "large" | "small" | "muted" | "p" | "lead";
};

export const typographyClasses = {
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  lead: "text-xl text-muted-foreground",
};

export const Typography = ({
  children,
  className,
  variant = "p",
}: TypographyProps) => {
  const classes = cn("scroll-m-20", typographyClasses[variant], className);
  return <p className={classes}>{children}</p>;
};
