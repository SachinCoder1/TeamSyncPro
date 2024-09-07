import React from "react";
import { Button } from "../ui/button";
import { VortexDemo } from "../landing/VortexDemo";
import { Main } from "../landing/Main";
import { Features } from "../landing/Features";

import dynamic from "next/dynamic";

const DynamicHeroScrollDemo = dynamic(
  () => import("../landing/HeroScroll").then((mod) => mod.HeroScrollDemo),
  {
    loading: () => <p>Loading...</p>,
  }
);


const DynamicAppleCardsCarouselDemo = dynamic(
  () => import("../landing/CardsCarousel").then((mod) => mod.AppleCardsCarouselDemo),
  {
    loading: () => <p>Loading...</p>,
  }
);


type Props = {};

const HomeInit = (props: Props) => {
  return (
    <div>
      <Main />
      <DynamicHeroScrollDemo />
      <div className="py-10">
        <Features />
      </div>
      <DynamicAppleCardsCarouselDemo />
      {/* <VortexDemo /> */}
    </div>
  );
};

export default HomeInit;
