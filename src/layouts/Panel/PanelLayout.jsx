import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../../containers";
export default function PanelLayout() {
  return (
    <>
      <SideBar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
