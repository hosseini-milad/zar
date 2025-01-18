import React from "react";
import {
  Hero,
  AppHero,
  ProductPreset,
  AboutUs,
  Branches,
} from "../../components";
export default function Home() {
  return (
    <>
      <div className="home">
        <Hero />
        <AppHero />
        <ProductPreset />
        <AboutUs />
        <Branches />
      </div>
    </>
  );
}
