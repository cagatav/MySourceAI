import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#000000]/50 bg-[#03001417] backdrop-blur-md z-40">
      <div className="flex justify-between items-center bg-[#03001417] shadow-lg h-[65px] px-4 md:px-0">
        <a
          href="#"
          className="flex items-center text-gray-300 font-bold hover:text-white duration-500 select-none ml-8"
        >
          <Image src="/MySourceAI-w.png" alt="logo" width={30} height={30} />
          <span className="ml-2 hidden md:block">MySourceAI</span>
        </a>
        
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
          <div className="flex items-center h-auto border border-[#ffffff69] bg-[#0300145e] px-[20px] py-[10px] rounded-lg text-gray-200">
            <a href="#ai-chat" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200 mx-8">
              AI Chat
            </a>
            <a href="#sources" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200 mx-8">
              Sources
            </a>
            <a href="#settings" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200 mx-8">
              Settings
            </a>
          </div>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-300 focus:outline-none"
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <nav className={`md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-2 bg-[#0300145e] border-t border-[#ffffff69] p-4">
          <a href="#ai-chat" className="font-semibold text-gray-200 hover:scale-105 hover:text-white duration-200">
            AI Chat
          </a>
          <a href="#sources" className="font-semibold text-gray-200 hover:scale-105 hover:text-white duration-200">
            Sources
          </a>
          <a href="#settings" className="font-semibold text-gray-200 hover:scale-105 hover:text-white duration-200">
            Settings
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
