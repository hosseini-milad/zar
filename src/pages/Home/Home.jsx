import React from "react";
import { Features, TwinSlide } from "../../components";
import { Hero, Category, Blog, Education } from "../../containers";
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
