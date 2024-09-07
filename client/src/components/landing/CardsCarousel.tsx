"use client";
import Image from "next/image";
import React from "react";
import { Card, Carousel } from "../ui/animations/apple-cards-carousel";
import { useTheme } from "next-themes";

export function AppleCardsCarouselDemo() {
  const {theme} = useTheme();
  const BASE_PATH = theme === "dark" ? "/platform_screenshots/dark" : "/platform_screenshots/light"
  
const data = [
  {
    category: "Drag and drop",
    title: "Board",
    src: `${BASE_PATH}/board.png`,
  },
  {
    category: "See in list view ",
    title: "List",
    src: `${BASE_PATH}/list.png`,
  },
  {
    category: "Filter",
    title: "Your tasks",
    src: `${BASE_PATH}/my_tasks.png`,
  },

  {
    category: "Customised Home",
    title: "Your dashboard",
    src: `${BASE_PATH}/home.png`,
  },
  {
    category: "Create and Invite",
    title: "Create new workspaces",
    src: `${BASE_PATH}/create_workspace.png`,
  },
  {
    category: "Hurray when tasks accomplished",
    title: "Interactive UI",
    src: `${BASE_PATH}/confetti.png`,
  },
];

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full md:py-20 pb-10 pt-4">
      <h2 id="demo" className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know TeamSync Pro (Sneak peak).
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
