import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen justify-between text-black bg-white ">
      <Header></Header>
      <>{children}</>
      <Footer></Footer>
    </div>
  );
};
