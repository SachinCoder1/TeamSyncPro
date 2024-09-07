import { SquareCheckBig } from "lucide-react";

export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Features",
    href: "#features",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Demo",
    href: "#demo",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Github",
    href: "https://github.com/sachincoder1/teamsyncpro",
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
    title: "Features",
    href: "#features",
    description:
      "Explore how TeamSyncPro helps your team stay organized, track progress, and meet deadlines effortlessly",
  },
  {
    title: "Demo",
    href: "#demo",
    description:
      "Experience TeamSyncPro in action—watch how easy it is to manage projects and collaborate with your team in real time",
  },
  {
    title: "Github",
    href: "https://github.com/sachincoder1/teamsyncpro",
    description:
      "Check out the source code for TeamSyncPro on GitHub and see how we build seamless project management tools",
  },
];

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Docs",
    href: "/https://documenter.getpostman.com/view/26033696/2sA3dyiWb2",
  },
  // {
  //   title: "Components",
  //   href: "/components",
  //   children: components,
  // },
  {
    title: "Getting Started",
    href: "/auth/signup",
    children: gettingStarted,
    asChild: {
      title: "Getting started",
      href: "/auth/signup",
      description:
        "Signup in 2 mins and get started.",
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
    href: "/workspace",
  },
  {
    title: "My Tasks",
    href: "/tasks",
  },
];
