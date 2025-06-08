import { useState } from "react";

const Card = ({ id, title, description, onClose }) => {
  const [toggles, setToggles] = useState({
    option1: false,
    option2: true,  // ON by default
    option3: false,
    option4: true,  // ON by default
    option5: false,
    option6: true,  // ON by default
    option7: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const options = [
    { key: "option1", label: "Enable Smart Reply" },
    { key: "option2", label: "Auto-format Text" },
    { key: "option3", label: "Show Hints" },
    { key: "option4", label: "AI Thinking" },
    { key: "option5", label: "Code Logging" },
    { key: "option6", label: "Logging" },
    { key: "option7", label: "Enable Code" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-sm"
          >
            ✖
          </button>
        </div>

        <div className="text-gray-700 text-md overflow-auto">
          <p>{description}</p>

          <div className="mt-4 ml-6">
            <select
              className="px-16 py-4 border border-gray-300 rounded-md text-sm text-gray-700 bg-white"
              defaultValue="2.5"
              onChange={(e) => console.log("Gemini Model:", e.target.value)}
            >
              <option value="1.5">Gemini 1.5 preview</option>
              <option value="2.0">Gemini 2.0 new Preview</option>
              <option value="2.5">Gemini 2.5 ultra Preview</option>
            </select>
          </div>

          {/* Toggle Switches */}
          <div className="mt-6 divide-y divide-gray-200">
            {options.map(({ key, label }) => (
              <div
                key={key}
                className="flex justify-between items-center px-2 py-2"
              >
                <span className="text-gray-800 text-sm">{label}</span>
                <div
                  onClick={() => handleToggle(key)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
                    toggles[key] ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      toggles[key] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            ))}

            {/* More Options Row */}
            <div className="flex justify-between items-center px-2 py-3 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-600 text-sm font-medium">More Options</span>
              <span className="text-gray-500 text-lg">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final footer text at the very bottom */}
      <div className="mt-6 text-center text-md text-gray-400">
        Advanced Settings
      </div>
    </div>
  );
};

export default Card;
