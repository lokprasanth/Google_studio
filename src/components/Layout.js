// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      {/* Main layout below navbar */}
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Page Content */}
        
      </div>
    </>
  );
};

export default Layout;
