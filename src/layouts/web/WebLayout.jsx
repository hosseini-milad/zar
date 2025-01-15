import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Footer } from "../../containers";
export default function WebLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
