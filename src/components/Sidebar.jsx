import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ExtensionIcon from "@mui/icons-material/Extension";
import HistoryIcon from "@mui/icons-material/History";


import Card from "./Card";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [activeCard, setActiveCard] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  //  Responsive check for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isCollapsed ? 64 : 240;
  const rightPanelWidth = 64;
  const cardPanelWidth = 420;

  const showSidebar = pathname !== "/" && !isMobile;
  const showRightPanel = pathname.startsWith("/studio");

  const navLinks = [
  {
  label: "Chat",
  path: "/studio",
  icon: (
    <div className="relative flex items-center justify-center w-5 h-5 leading-none">
      <ChatBubbleOutlineIcon
        fontSize="small"
        className="text-gray-600 leading-none"
      />
      <span className="absolute top-0 right-0 w-2 h-2 bg-gray-600 rounded-full" />
    </div>
  ),
},
  {
    label: "Stream",
    path: "/dashboard",
    icon: (
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
    ),
  },
  {
    label: "Generate Media",
    path: "/dashboard",
    icon: <PhotoLibraryIcon fontSize="small" className="text-gray-600" />,
  },
  {
    label: "Build",
    path: "/dashboard",
    icon: (
      <ExtensionIcon
        fontSize="small"
        sx={{ stroke: "gray", fill: "white", strokeWidth: 1.2 }}
      />
    ),
  },
  {
    label: "History",
    path: "/dashboard",
    icon: <HistoryIcon fontSize="small" sx={{ color: "gray" }} />,
  },
  {
    label: "Enable Saving",
    path: "/settings",
    icon: (
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
    ),
  },
];

const isDashboard = pathname.startsWith("/dashboard");

const dashboardLinks = [
 {
    label: "API Keys",
    path: "/dashboard",
    icon: <VpnKeyIcon fontSize="small" className="text-gray-600" />,
  },
  {
    label: "Usage & Billing",
    path: "/studio",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <line x1="6" y1="10" x2="6" y2="18" />
        <line x1="12" y1="4" x2="12" y2="18" />
        <line x1="18" y1="10" x2="18" y2="18" />
      </svg>
    ),
  },
  {
    label: "Changelog",
    path: "/studio",
    icon: (
      <svg
        width="20"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        stroke="gray"
        strokeWidth="1.2"
      >
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
      </svg>
    ),
  },
];

  const rightButtons = [
    {
      id: "settings",
      icon: <SettingsIcon fontSize="small" sx={{ color: "#A3A3A3", cursor: "pointer" }} />,
      label: "Run Settings",
      content: "Adjust model and runtime preferences here.",
    },
    {
      id: "gallery",
      icon: <ViewModuleIcon fontSize="small" sx={{ color: "#A3A3A3", cursor: "pointer" }} />,
      label: "Prompt Gallery",
      content: "Browse reusable prompt templates.",
    },
  ];

  const currentCard = rightButtons.find((btn) => btn.id === activeCard);

  const curlCode = `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'`;

  return (
    <>
      {/*  Sidebar (hidden on mobile) */}
      {showSidebar && (
        <aside
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden sm:flex fixed top-16 left-0 bottom-0 bg-[#f5f7fd] text-black flex-col pt-6 px-2 space-y-4 cursor-pointer"
          style={{
            width: `${sidebarWidth}px`,
            height: "calc(100vh - 4rem)",
            transition: "width 0.3s ease-in-out",
            zIndex: 1000,
          }}
        >
          {(isDashboard ? dashboardLinks : navLinks).map(({ label, icon, path }) => (
            <NavLink
              key={label}
              to={path}
              title={isCollapsed ? label : ""}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-[#ebeef9] ${
                  isCollapsed ? "justify-center" : ""
                } ${isActive ? "bg-[#ebeef9] font-semibold" : ""}`
              }
            >
              <span>{icon}</span>
              {!isCollapsed && <span className="text-gray-600">{label}</span>}
            </NavLink>
          ))}
        </aside>
      )}

      {/*  Main Content */}
      <div
        className="fixed top-16 bottom-0 flex bg-[#f5f7fd]"
        style={{
          left: showSidebar ? `${sidebarWidth}px` : "0px",
          right: !isMobile && showRightPanel ? `${rightPanelWidth}px` : "0px",
          height: "calc(100vh - 3rem)",
          padding: "1rem",
          transition: "left 0.3s ease-in-out, right 0.3s ease-in-out",
          gap: "1rem",
          overflow: "visible",
        }}
      >
       <main
  className="h-full w-full rounded-2xl bg-white shadow-sm p-4 transition-all duration-300"
  style={{
    flexBasis: isMobile
      ? "100%" // full width on mobile, ignoring side panel width
      : showRightPanel && currentCard
      ? `calc(100% - ${cardPanelWidth}px)` // original desktop style
      : "100%",
    overflowY: isMobile
      ? "auto" // enable vertical scroll on mobile always
      : pathname === "/dashboard"
      ? "auto"
      : "hidden",
  }}
>
  
          {pathname === "/dashboard" ? (
       <div className="w-full max-w-[95%] sm:max-w-[90%] mx-auto px-3 sm:px-4 py-4 space-y-6">
        
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-3">
            <div className="space-y-9">
              <h2 className="text-2xl font-normal">API Keys</h2>
              <p className="text-md text-gray-900 font-medium">Quickly test the Gemini API</p>
              <h3 className="text-sm text-[#1c80ff] font-medium font-sans">API quickstart guide</h3>
            </div>
            <button className="w-full sm:w-auto bg-[#076eff] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-900 transition duration-200">
              + <span className="ml-1">Create API Key</span>
            </button>
          </div>

          {/* Curl Code Block */}
          <pre className="text-sm whitespace-pre-wrap bg-[#edeef1] p-4 rounded-xl text-gray-700  overflow-auto">
            {curlCode}
            <div className="border-t border-gray-300 pt-3 mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-gray-700">
              <div className="flex items-center space-x-4">
                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(curlCode);
                    alert("Copied to clipboard!");
                  }}
                  className="hover:text-blue-600 cursor-pointer"
                  aria-label="Copy code"
                  title="Copy code"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-4 h-4"
                    style={{ transform: "scaleY(-1)" }}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Download Button */}
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([curlCode], { type: "text/plain" });
                    element.href = URL.createObjectURL(file);
                    element.download = "api_curl_command.txt";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="hover:text-blue-600 cursor-pointer"
                  aria-label="Download code"
                  title="Download code"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M12 3v13m0 0l-5-5m5 5l5-5" />
                    <path d="M4 18h16" />
                  </svg>
                </button>

                <span className="text-xs font-medium">
                Use code <strong className="text-blue-500">with caution.</strong>
              </span>

              </div>
              
            </div>
          </pre>

          {/* Info text */}
          <p className="text-sm text-gray-600">
            Your API keys are listed below. You can also view and manage your project and API keys in Google Cloud.
          </p>

          {/* Table placeholder */}
          <div className="bg-white rounded-xl border border-gray-300 font-light text-gray-700 overflow-auto">
            <table className="w-full text-left text-sm rounded-t-lg bg-[#edf2fa] min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-300 font-medium">
                  <th className="py-3 px-4">Project number</th>
                  <th className="py-3 px-4">Project name</th>
                  <th className="py-3 px-4">API key</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Plan</th>
                </tr>
              </thead>
            </table>
            <p className="text-sm text-gray-600 text-center py-7">
              Create an API key to see your projects.
            </p>
          </div>

          {/* Footer Notice */}
          <p className="text-sm text-gray-500">
            Remember to use API keys securely. Don't share or embed them in public code. Use of Gemini API from a billing-enabled project is subject to{" "}
            <span className="text-blue-500">pay-as-you-go pricing.</span>
          </p>
        </div>


          ) : (
            <Outlet />
          )}
        </main>

        {/*  Right card panel (desktop only) */}
        {showRightPanel && currentCard && !isMobile && (
          <div
            className="h-full bg-white rounded-lg shadow-lg"
            style={{
              width: `${cardPanelWidth}px`,
              minWidth: "240px",
              flexShrink: 0,
              transition: "width 0.3s ease-in-out",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <Card
              id={currentCard.id}
              title={currentCard.label}
              description={currentCard.content}
              onClose={() => setActiveCard(null)}
              width={cardPanelWidth}
            />
          </div>
        )}
      </div>

      {/*  Right icon buttons (desktop only) */}
      {showRightPanel && !isMobile && (
        <div
          className="fixed top-16 right-0 bottom-0 bg-[#f5f7fd] flex flex-col items-center py-20 space-y-8 shadow-lg"
          style={{
            width: `${rightPanelWidth}px`,
            height: "calc(100vh - 4rem)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {rightButtons.map(({ id, icon, label }) => (
            <div
              key={id}
              className="relative flex justify-center cursor-pointer"
              onClick={() => setActiveCard(activeCard === id ? null : id)}
              title={label}
            >
              {icon}
            </div>
          ))}
        </div>
      )}



{isMobile && pathname === "/dashboard" && ( //setting icon api mobile
  <div className="fixed top-4 right-4 z-[1001] flex items-center px-4 py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-600"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  </div>
)}



      {/*  Mobile top-right control bar (icon buttons + Gemini selector) */}
{isMobile && pathname.startsWith("/studio") && (
  <div className="fixed top-4 right-4 z-[1001] flex flex-row items-center space-x-9 px-4 py-2">
    {/*  Gemini Selector beside icons */}
    <div className="ml-2 -mt-2">
      <select
        className="px-2 py-2 border border-gray-500 rounded-md text-md text-gray-700 bg-[#f5f7fd]"
        defaultValue="2.5"
        onChange={(e) => console.log("Gemini Model:", e.target.value)}
      >
        <option value="1.5">Gemini 1.5</option>
        <option value="2.0">Gemini 2.0</option>
        <option value="2.5">Gemini 2.5</option>
      </select>
    </div>
    {/* Icon Buttons */}
    {rightButtons.map(({ id, icon, label }) => (
      <div key={id} className="relative flex flex-col items-center group">
        <button
          onClick={() => setActiveCard(activeCard === id ? null : id)}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          title={label}
          style={{ fontSize: "0.7rem" }}
        >
          {icon}
        </button>

        {/* Dropdown Below Each Icon */}
        {activeCard === id && (
          <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-[1002]">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold">{label}</h4>
              <button
                onClick={() => setActiveCard(null)}
                className="text-gray-400 hover:text-red-500 text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600">{rightButtons.find(b => b.id === id).content}</p>
          </div>
        )}
      </div>
    ))}

    
  </div>
)}

    </>
  );
};

export default Sidebar;
