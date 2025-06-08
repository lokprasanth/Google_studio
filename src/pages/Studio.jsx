import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiCode,
  FiShare2,
  FiSave,
  FiRefreshCw,
  FiMoreVertical,
  FiPlus,
  FiArrowUpCircle,
} from "react-icons/fi";
import { TbArrowsExchange } from "react-icons/tb";

export default function Studio() {
  const whatsNew = [
    {
      title: "Native speech generation",
      text: "Generate high quality text to speech with Gemini",
      badge: "New",
      image:
        "https://plus.unsplash.com/premium_photo-1678796801121-7324d8e04026?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=60&h=60",
    },
    {
      title: " Ai Live audio-to-audio dialog",
      text: "Try Gemini's real-time dialog with audio and video inputs",
      badge: "New",
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWl8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Native image generation",
      text: "Interleaved text-and-image generation with Gemini 2.0 Flash",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=60&h=60",
    },
    {
      title: "Explore and co-develop apps",
      text: "See Gemini in action with open source examples",
      image:
        "https://images.unsplash.com/photo-1688235142578-c4e1523c6347?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredItems = whatsNew.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function highlightText(text, highlight) {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 text-yellow-900 rounded px-0.5 font-semibold"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  function handleRunClick() {
    if (searchTerm.trim()) {
      console.log("Running with:", searchTerm);
    }
  }

// Searchbar text tranform
const [placeholderIndex, setPlaceholderIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setPlaceholderIndex((prev) => (prev + 1) % 5); // total 5 placeholders
  }, 1000);
  return () => clearInterval(interval);
}, []);

const placeholderTexts = [
  "Create a detailed description of an alien planet.",
  "Design a futuristic cityscape.",
  "Generate a unique sci-fi creature with special abilities.",
  "Create a magical unique spell and explain how it works environment.",
  "Outline a post-apocalyptic world and its survival rules.",
  "Draft a detailed description of an alien environment.",
];


  
  return (
    <div className="flex flex-col min-h-screen rounded-2xl overflow-hidden bg-white">
      {/* Top Nav */}
      <div className="flex items-center justify-between border-b px-4 sm:px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">Chat Prompt</h3>
        <div className="ml-auto flex items-center gap-x-4 sm:gap-x-8 text-gray-600 text-xl overflow-x-auto pr-2 sm:pr-6 no-scrollbar">
          <button title="Notepad" className="hover:text-blue-600">
            <FiFileText />
          </button>
          <button title="Code Arrows" className="hover:text-blue-600">
            <FiCode />
          </button>

          {!isMobile && (
            <>
              <button title="Share" className="hover:text-blue-600 opacity-60">
                <FiShare2 />
              </button>
              <button title="Save" className="hover:text-blue-600 opacity-60">
                <FiSave />
              </button>
              <button title="Compare Mode" className="hover:text-blue-600">
                <TbArrowsExchange />
              </button>
              <button title="Reload" className="hover:text-blue-600 opacity-60">
                <FiRefreshCw />
              </button>
            </>
          )}

          <button title="More Options" className="hover:text-blue-600">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* Responsive Content */}
      {isMobile ? (
        <div className="px-4 py-6">
          {/* Welcome Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-[#033279] via-[#0748a9] to-[#1a78fd] bg-clip-text text-transparent">
              Welcome to AI Studio
            </h2>

          </div>

          {/* What's New Cards */}
          <h4 className="text-xs font-medium text-gray-400 mb-4">What's New</h4>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.title}
                  className="min-w-[280px] flex-shrink-0 bg-[#edf2fa] p-5 rounded-2xl shadow-md transition hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-xl w-16 h-18 object-cover"
                    />
                    <div>
                      <p className="text-md font-medium text-gray-800">
                        {highlightText(item.title, searchTerm)}
                      </p>
                      {item.badge && (
                        <span className="text-xs bg-[#0062a1] text-white px-1 py-0.5 rounded-full inline-block mt-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm  text-gray-700 leading-snug">
                    {highlightText(item.text, searchTerm)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent updates.</p>
            )}
          </div>

          {/* Search Bar */}
         <div className="mt-6">
            <div className="relative flex items-center border border-gray-300 bg-white rounded-full px-7 py-4 shadow-sm">
            

            <input
              type="text"
              placeholder="Start typing a Prompt"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 -ml-4 text-sm focus:outline-none bg-transparent"
            />

             {/* Circular FiPlus Button beside arrow */}
            <button
              className="sm:flex items-center justify-center w-6 h-5 -ml-4 rounded-full border border-gray-800"
              aria-label="Add"
            >
              <FiPlus className="w-5 h-4" />
            </button>


            {/* Submit Arrow Button */}
            <button
              onClick={handleRunClick}
              className="text-gray-300 ml-2 hover:text-gray-400 transition"
              aria-label="Submit"
            >
              <FiArrowUpCircle className="w-6 h-6" />
            </button>

           

          </div>
        </div>

          
        </div>
      ) : (
        <div className="text-center py-20 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-sans bg-gradient-to-r from-[#033279] via-[#0748a9] to-[#1a78fd] bg-clip-text text-transparent">
              Welcome to AI Studio
          </h2>


          <div className="relative flex items-center border mt-8 rounded-full px-6 py-3 shadow-sm max-w-2xl mx-auto w-full bg-white">
            <input
              type="text"
              placeholder={placeholderTexts[placeholderIndex]}
              className="flex-1 focus:outline-none text-sm capitalize w-full pr-20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search what's new"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-24 text-gray-500 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            )}

            <button className="hidden sm:flex items-center justify-center w-5 h-5 mr-2 rounded-full border border-gray-800">
              <FiPlus className="w-4 h-4" />
            </button>

            <button
              onClick={handleRunClick}
              className="bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm text-gray-800 flex items-center gap-1"
              aria-label="Run prompt"
            >
              Run <span className="text-xs hidden sm:inline">Ctrl ↵</span>
            </button>
          </div>

          {/* Desktop What's New */}
          <div className="max-w-4xl mx-auto mt-12">
            <h4 className="text-md text-gray-500 mb-4 text-start">What's new</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#edf2fa] p-3 rounded-lg flex flex-col gap-2 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="rounded w-14 h-14  object-cover"
                        />
                        <h5 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {highlightText(item.title, searchTerm)}
                        </h5>
                      </div>
                      
                      {item.badge && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}

                      
                    </div>
                    <p className="text-sm  text-gray-600  leading-snug">
                      {highlightText(item.text, searchTerm)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full py-8">
                  No results found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
