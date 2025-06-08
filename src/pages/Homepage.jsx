import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md h-16 flex items-center justify-between px-4 sm:px-8 md:px-16">
        <Link
          to="/"
          className="text-sm flex sm:text-lg md:text-xl font-semibold text-white"
          style={{
            fontFamily:
              '"Product Sans", "Google Sans", "Helvetica Neue", sans-serif',
          }}
        >
          Google <span className="font-normal">AI Studio</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            to="/dashboard"
            className="px-4 py-1.5 rounded-md bg-gray-600 bg-opacity-50 text-white text-xs sm:text-sm hover:scale-105 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/studio"
            className="px-4 py-1.5 rounded-md text-white text-xs sm:text-sm hover:bg-gray-900 border border-gray-200 transition"
          >
            Studio
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="fixed inset-0 z-40 bg-black pt-20 px-4 overflow-hidden">
        <div className="w-full max-w-9xl mx-auto h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left px-4 md:px-8 space-y-6 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
              Build with the latest models from Google DeepMind
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl">
              Get your API key and integrate powerful AI capabilities into your
              applications in less than 5 minutes.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 sm:px-8 py-2 bg-gradient-to-r from-[#0a46ff] to-[#2c83fc] text-white rounded-md shadow-lg hover:scale-105 transition-transform duration-200 text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>

          {/* Right: Foreground + Background Images */}
          <div className="flex-1 relative flex justify-center items-center px-4 z-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            {/* Background Image - top right positioned */}
            <img
              src="/code_background.png"
              alt="Background Layer"
              className="absolute -top-7 right-0 sm:right-4 md:right-8 w-[250px] sm:w-[400px] md:w-[550px]  z-0 pointer-events-none"
            />

            {/* Foreground Prompt Image */}
            <img
              src="/prompt.png"
              alt="Prompt"
              className="relative w-[280px] sm:w-[500px] md:w-[800px] h-auto object-contain drop-shadow-2xl z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
