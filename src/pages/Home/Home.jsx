import React from "react";
import { Features, TwinSlide, Education } from "../../components";
import { Hero, Category, Blog } from "../../containers";
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
