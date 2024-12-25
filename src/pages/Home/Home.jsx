import React from "react";
import { Features, Category, TwinSlide, Education } from "../../components";
import { Hero, Blog } from "../../containers";
export default function Home() {
  return (
    <>
      <div className="home">
        <Hero />
        <Features />
        <Category />
        <TwinSlide />
        <Blog />
        <Education />
      </div>
    </>
  );
}
