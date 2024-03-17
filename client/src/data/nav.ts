import { SquareCheckBig } from "lucide-react";

export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
export const gettingStarted: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Introduction",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "Components",
    href: "/components",
    children: components,
  },
  {
    title: "Getting Started",
    href: "/",
    children: gettingStarted,
    asChild: {
      title: "Getting started",
      href: "/",
      description:
        "Beautify your app with our components. Radix ui and Tailwind CSS.",
    },
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Sign in",
    href: "/auth/signin",
  },
];

export const loggedInNavLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Account",
    href: "/account",
  },
];
