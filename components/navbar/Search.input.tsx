import React from "react";

const Searchinput = () => {
  return (
    <div className="relative w-full max-w-xs ml-4">
      <input
        type="text"
        placeholder="Search Facebook"
        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Searchinput;
