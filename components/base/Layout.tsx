import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-auto justify-between text-black bg-white ">
      <Header></Header>
      <>{children}</>
      <Footer></Footer>
    </div>
  );
};
