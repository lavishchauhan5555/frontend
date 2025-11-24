// src/components/Layout.tsx
import React from "react";
import Navbar from "../pages/Navbar"
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      
        <Outlet /> {/* This renders the matched child route */}
      
      <Footer />
    </div>
  );
};

export default Layout;