import React, { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";

import SettingsIcon from '@mui/icons-material/Settings';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExtensionIcon from '@mui/icons-material/Extension';
import HistoryIcon from '@mui/icons-material/History';

import Card from './Card';

// Zigzag wave icon for Stream
const SymmetricVerticalBarsIcon = ({ fontSize = "small", sx = {} }) => {
  const barHeights = [16, 14, 9, 14, 16];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize === "small" ? 24 : 32}
      height={fontSize === "small" ? 24 : 32}
      viewBox="0 0 24 24"
      fill="none"
      stroke={sx.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ ...sx }}
    >
      {barHeights.map((y1, index) => {
        const x = 4 + index * 3;
        return <line key={index} x1={x} y1={y1} x2={x} y2={19} />;
      })}
    </svg>
  );
};

const Sidebar = () => {
  const [activeCard, setActiveCard] = useState(null);
  const location = useLocation();

  const generalLinks = [
    {
      to: "/studio",
      label: "Chat",
      icon: (
        <div className="relative flex items-center">
          <ChatBubbleOutlineIcon fontSize="small" sx={{ color: '#A3A3A3' }} />
          <FiberManualRecordIcon
            fontSize="small"
            color="black"
            className="absolute -top-0 -right-0"
            style={{ fontSize: 8 }}
          />
        </div>
      ),
    },
    {
      to: "/stream",
      label: "Stream",
      icon: <SymmetricVerticalBarsIcon fontSize="small" sx={{ color: '#A3A3A3' }} />,
    },
    {
      to: "/media",
      label: "Generate Media",
      icon: (
        <div className="relative flex items-center">
          <ChatBubbleOutlineIcon fontSize="small" sx={{ color: '#A3A3A3' }} />
        
        </div>
      ),
    },
    {
      to: "/build",
      label: "Build",
      icon: <ExtensionIcon fontSize="small" sx={{ color: '#A3A3A3' }} />,
    },
    {
      to: "/history",
      label: "History",
      icon: <HistoryIcon fontSize="small" sx={{ color: '#A3A3A3' }} />,
    },
  ];

  const dashboardLinks = [
    { to: "/dashboard/api-key", label: "🔑 API Key" },
    { to: "/dashboard/usage-billing", label: "💰 Usage & Billing" },
    { to: "/dashboard/changelog", label: "📜 Changelog" },
  ];

  const isDashboard = location.pathname.startsWith("/dashboard");
  const links = isDashboard ? dashboardLinks : generalLinks;

  const isLinkActive = (to) => {
    if (to === "/studio") {
      return (
        location.pathname === "/studio" ||
        location.pathname.startsWith("/studio/") ||
        location.pathname === "/chat" ||
        location.pathname.startsWith("/chat/")
      );
    }
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  const sidebarWidth = 240;
  const rightPanelWidth = isDashboard ? 0 : 64;

  const rightButtons = [
    {
      id: "settings",
      icon: <SettingsIcon fontSize="small" sx={{ color: '#A3A3A3', cursor: 'pointer' }} />,
      label: "Run Settings",
      content: "Adjust model and runtime preferences here.",
    },
    {
      id: "gallery",
      icon: <ViewModuleIcon fontSize="small" sx={{ color: '#A3A3A3', cursor: 'pointer' }} />,
      label: "Prompt Gallery",
      content: "Browse reusable prompt templates.",
    },
  ];

  const currentCard = rightButtons.find(btn => btn.id === activeCard);

  return (
    <>
      {/* Left Sidebar */}
      <aside
        className="fixed top-16 left-0 bottom-0 bg-[#f5f7fd] text-black flex flex-col pt-16 px-4 space-y-6 overflow-y-auto"
        style={{ width: sidebarWidth, height: 'calc(100vh - 4rem)' }}
      >
       {links.map(({ to, label, icon }) => (
  <NavLink
    key={to}
    to={to}
    end={!isDashboard}
    className={() =>
      `flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-[#ebeef9] ${
        isLinkActive(to) ? "bg-[#ebeef9] font-semibold border-l-4" : ""
      }`
    }
  >
    {icon && <span>{icon}</span>}
    <span className="text-gray-600">{label}</span>  {/* Add this class */}
  </NavLink>
))}

      </aside>

      {/* Flex container holding main + card side-by-side */}
      <div
        className="fixed top-16 bottom-0 flex"
        style={{
          left: sidebarWidth,
          right: rightPanelWidth,
          height: 'calc(100vh - 4rem)',
          padding: '1rem',
          gap: '1rem',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <main
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{
            flexGrow: 1,
            flexBasis: currentCard ? '65%' : '100%',
            transition: 'flex-basis 0.3s ease-in-out',
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </main>

        {currentCard && (
          <div
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex-shrink-0"
            style={{
              width: '35%',
              minWidth: '280px',
              transition: 'width 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              zIndex: 10,
            }}
          >
            <Card
              id={currentCard.id}
              title={currentCard.label}
              description={currentCard.content}
              onClose={() => setActiveCard(null)}
            />
          </div>
        )}
      </div>

      {!isDashboard && (
        <div
          className="fixed top-16 right-0 bottom-0 bg-[#f5f7fd] flex flex-col items-center py-20 space-y-8 shadow-lg"
          style={{ width: rightPanelWidth, height: 'calc(100vh - 4rem)', zIndex: 1000 }}
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
    </>
  );
};

export default Sidebar;
