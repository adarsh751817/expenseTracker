
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>

      {/* Sidebar on the right */}
      <Header />
    </div>
  );
}
