import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HistoryIcon from "@mui/icons-material/History";
import ExtensionIcon from "@mui/icons-material/Extension";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';


import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentsIcon from "@mui/icons-material/Payments";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Navbar = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const profileRef = useRef(null);
  const settingsRef = useRef(null);

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path, isButton = false) => {
    const base = isActive(path) ? "text-black font-bold" : "text-black hover:text-black";
    const button = isButton ? "bg-gray-200 px-4 py-1 rounded-2xl hover:bg-gray-300 transition-colors" : "";
    return `${base} ${button}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (
        isMobileMenuOpen &&
        !event.target.closest("#mobileSidebar") &&
        !event.target.closest("#hamburger")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);


  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMobileMenuOpen(false); // Auto-close on desktop
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  if (location.pathname === "/") return null; // navbar in homage hide

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-[#f5f7fc] items-center px-6 z-[1001]">
        <Link
            to="/studio"
            aria-label="home"
            style={{
              fontFamily: '"Product Sans","Google Sans", "Helvetica Neue", sans-serif',
              fontWeight: 550,
              fontStyle: 'normal',
              fontSize: '22px',
              lineHeight: '28px',
              color: '#001D35',
              textDecoration: 'none',
            }}
          >
            Google <span style={{ fontWeight: 400 }}>AI Studio</span>
          </Link>


        <nav className="ml-auto flex items-center h-full space-x-6">
          <a href="/dashboard" className={`flex items-center bg-[#e7ebf8] py-2 px-2 font-normal text-sm gap-2 ${linkClass("/dashboard", true)}`}>
            <VpnKeyIcon fontSize="small" className="text-gray-900" />
            Get API Key
          </a>
          <a href="/studio" className={linkClass("/studio")}>Studio</a>
          <a href="/dashboard" className={linkClass("/dashboard")}>Dashboard</a>
          <a
          href="https://cloud.google.com/ai-platform/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-black"
          >
          Documentation
          <OpenInNewIcon fontSize="small" className="text-gray-400" />
         </a>

        </nav>

        <div className="ml-4 flex items-center h-full space-x-4 relative" ref={profileRef}>
          <button
            className="text-black hover:text-gray-800"
            onClick={() => {
              setShowSettings((prev) => !prev);
              setShowProfile(false);
            }}
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" fill="white" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06c.46.46 1.12.6 1.7.33.58-.27.95-.89.95-1.51V3a2 2 0 1 1 4 0v.09c0 .62.37 1.24.95 1.51.58.27 1.24.13 1.7-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.2.6.81 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.7 0-1.31.4-1.51 1z" />
            </svg>
          </button>

          <button
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowSettings(false);
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="profile"
              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition"
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-xl shadow-xl p-4 z-[1101] text-center">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="profile"
                className="w-12 h-12 rounded-full mx-auto mb-2"
              />
              <p className="text-sm text-gray-700 mb-4">user@example.com</p>
              <div className="space-y-4">
                <button className="px-3 py-2 rounded-lg bg-white border text-blue-950 hover:bg-gray-200 text-sm">
                  Switch Account
                </button>
                <hr className="my-4 border-gray-400" />

                <button className="w-full text-sm text-blue-950">Sign Out</button>
              </div>
              <hr className="my-2 border-gray-400" />
              <div className="flex justify-between text-xs text-gray-500">
                <button className="hover:underline">Privacy Policy</button>
                <button className="hover:underline">Terms of Service</button>
              </div>
            </div>
          )}

          {showSettings && (
            <div
              className="absolute right-9 top-full mt-2 w-62 bg-white border rounded-xl shadow-xl p-4 z-[1101] text-left"
              ref={settingsRef}
            >
              <div className="bg-gray-50 rounded-lg p-1 mb-2 border">
                <div className="flex gap-2 justify-center items-center">
                  <button className="p-2 rounded-full hover:bg-gray-200 transition">
                    <LightModeIcon fontSize="small" className="text-gray-700" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-200 transition">
                    <DarkModeIcon fontSize="small" className="text-gray-700" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-200 transition">
                    <LaptopMacIcon fontSize="small" className="text-gray-700" />
                  </button>
                </div>
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-950 text-left">
                <GavelIcon fontSize="small" />Enable Save
              </button>
              <hr className="my-2 border-gray-200" />
              <button className="w-full flex items-center gap-2 py-3 rounded-lg hover:bg-gray-100 text-sm text-gray-700 text-left">
                <GavelIcon fontSize="small" /> Terms of Service
              </button>
              <button className="w-full flex items-center gap-2 px-1 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700 text-left">
                <PolicyIcon fontSize="small" /> Privacy Policy
              </button>
              <button className="w-full flex items-center gap-2 py-3 rounded-lg hover:bg-gray-100 text-sm text-gray-700 text-left">
                <FlagIcon fontSize="small" />Send Feedback
              </button>
              <button className="w-full flex items-center gap-2 py-3 rounded-lg hover:bg-gray-100 text-sm text-gray-700 text-left">
                <PaymentsIcon fontSize="small" /> Billing & Support
              </button>
            </div>
          )}
        </div>
      </header>

      {/*  Mobile Menu Icon (hidden when menu is open, and always hidden on desktop) */}
      <div
        id="hamburger"
        className={`fixed top-5 left-4 z-[1200] block md:hidden ${isMobileMenuOpen ? "hidden" : ""}`}
      >
        <button onClick={() => setMobileMenuOpen(true)}>
          <MenuIcon className="text-black" />
        </button>
      </div>


      {/* Mobile Sidebar */}
   {isMobileMenuOpen && (
  <div
    id="mobileSidebar"
    className="fixed top-0 left-0 h-full w-52 bg-white shadow-lg z-[1199] flex flex-col justify-between"
  >
    {/* Top: Logo + Menu */}
    <div className="p-4">
      <div className="text-2xl flex  font-sans py-3 mb-9">
           <Link
            to="/"
            aria-label="home"
            style={{
              fontFamily: '"Product Sans","Google Sans", "Helvetica Neue", sans-serif',
              fontWeight: 550,
              fontStyle: 'normal',
              fontSize: '22px',
              lineHeight: '28px',
              color: '#001D35',
              textDecoration: 'none',
            }}
            >
            Google <span style={{ fontWeight: 400 }}>AI Studio</span>
          </Link>     
       </div>

      <div className="px-2">
       <Link
          to="/dashboard"
          className="flex justify-center items-center gap-1  py-3 bg-[#edf2fa] border rounded-3xl text-sm mb-7 text-black hover:bg-[#cbd0e0] transition-colors"
        >
          <VpnKeyIcon fontSize="small" className="text-gray-600" />
          Get API Key
        </Link>


      </div>
        
      <div className="space-y-9">
        
        {/* Studio Dropdown */}
        <div>
          <button
            className="flex justify-between w-full text-sm font-normal text-[#001D35]"
            onClick={() => setStudioOpen(!studioOpen)}
          >
            Studio <ExpandMoreIcon fontSize="small" className="text-gray-500" />
          </button>
          {studioOpen && (
  <div className="ml-4 mt-5 space-y-4 font-normal text-sm text-gray-700">
    
    {/*  Chat + black dot  */}
    <Link to="/studio" className="flex items-center hover:bg-[#d9dce7] rounded-2xl px-3 py-2 gap-2 relative">
        <div className="relative">
          <ChatBubbleOutlineIcon fontSize="small" className="text-gray-600" />
          <span className="absolute -top-0 -right-0 w-2 h-2 bg-gray-600 rounded-full"></span>
        </div>
        Chat
      </Link>


            {/*  Stream - horizontal sequence icon (custom SVG) */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:bg-[#d9dce7] rounded-2xl px-3 py-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                >
                  <line x1="6" y1="8" x2="6" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="29" />
                  <line x1="18" y1="8" x2="18" y2="20" />
                </svg>
                Stream
           </Link>


              {/*  General Media - Chat icon inside outlined shape */}
            <Link to="/studio" className="flex items-center gap-2 hover:bg-[#d9dce7] rounded-2xl px-3 py-2">
                <PhotoLibraryIcon fontSize="small" className="text-gray-600" />
                Generate Media
              </Link>



            {/*  Build - thin puzzle icon with white fill, no double stroke */}
            <Link to="/dashboard" className="flex items-center gap-2 hover:bg-[#d9dce7] rounded-2xl px-3 py-2">
              <ExtensionIcon sx={{ stroke: "gray", fill: "white", strokeWidth: 1.2 }} fontSize="small" />
              Build
            </Link>

            {/*  History */}
          <Link to="/studio" className="flex items-center gap-2 hover:bg-[#d9dce7] rounded-2xl px-3 py-2">
            <HistoryIcon fontSize="small" sx={{ color: 'gray' }} /> History
          </Link>


          {/*  Enable Saving - Pyramid triangle with plus inside */}
        <Link to="/dashboard" className="flex items-center gap-2 hover:bg-[#d9dce7] rounded-2xl px-3 py-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#4B5563"
              strokeWidth="11" 
            >
              <path d="M170 32h172l170 296H340z" />
              
              <path d="M170 32L0 328l85 152 170-296z" />
              
              <path d="M512 328L427 480H85L170 328z" />
            </svg>
            Enable Saving
          </Link>

     
   </div>
   )}
        </div>

        {/* Documentation */}
        <a
          href="https://cloud.google.com/ai-platform/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-black"
          >
          Documentation
          <OpenInNewIcon fontSize="small" className="text-gray-400" />
         </a>

        {/* Dashboard Dropdown */}
    <div>
          <button
            className="flex justify-between w-full text-sm  text-[#001D35]"
            onClick={() => setDashboardOpen(!dashboardOpen)}
          >
            Dashboard <ExpandMoreIcon fontSize="small" className="text-gray-500" />
          </button>
      {dashboardOpen && (
        <div className="ml-2  space-y-2  ">
             <div className="mt-6 ml-2 -mb-6 text-sm text-gray-700 ">
                <Link
                to="/dashboard"
                className="flex justify-center items-center gap-2  py-3 mr-16  hover:rounded-3xl text-sm mb-7 text-black hover:bg-[#edf2fa] transition-colors"
              >
                <VpnKeyIcon fontSize="small" className="text-gray-600" />
                API Keys
              </Link>
             </div>
              

        {/*  Usage & Billing – reversed black bars */}
            <Link to="/studio" className="flex items-center gap-2 hover:bg-[#edf2fa] rounded-2xl px-3 py-2">
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"      // pure black
              strokeWidth="2.2"     // thicker stroke
              strokeLinecap="round"
            >
              {/* Left bar – short */}
              <line x1="6" y1="10" x2="6" y2="18" />
              
              {/* Middle bar – tallest */}
              <line x1="12" y1="4" x2="12" y2="18" />
              
              {/* Right bar – short */}
              <line x1="18" y1="10" x2="18" y2="18" />
            </svg>
            Usage & Billing
          </Link>

     {/* Changelog – two white-filled rectangles with gray stroke */}
        <Link to="/dashboard" className="flex items-center gap-2 hover:bg-[#edf2fa] rounded-2xl px-3 py-2">
          <svg
            width="20"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="gray"
            strokeWidth="1.2"
          >
            {/* Top rectangle – increased height */}
            <rect x="4" y="4" width="16" height="6" rx="1" />
            
            {/* Bottom rectangle – same height, adjust Y to avoid overlap */}
            <rect x="4" y="14" width="16" height="6" rx="1" />
          </svg>
          Changelog
        </Link>


      </div>
          )}
  </div>

        
      </div>

       <div className="mt-20 text-xs text-gray-600 leading-relaxed ">
         Access your tools, API keys, and dashboards and productive with AI Studio. <span className="text-blue-500">Learn more</span>
       </div>
            
            <hr className="my-4 border-gray-300" />

      <div className="mt-2   border-gray-200 flex items-center gap-3 ">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div className="flex flex-col ">
          <span className="text-xs text-gray-400 uppercase">Signed in as</span>
          <span className="text-sm font-medium text-gray-800 truncate flex">user@example.com</span>
        </div>
      </div>


    </div>

    {/* Bottom: User Info */}
   {/* User Info Section */}


  </div>
)}


    </>
  );
};

export default Navbar;
