import React, { useEffect, useState } from "react";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};
