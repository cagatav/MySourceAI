import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#000000]/50 bg-[#03001417] backdrop-blur-md z-40">
      <div className="flex justify-between items-center bg-[#03001417] shadow-lg h-[65px] px-4 md:px-0">
        <a
          href="#"
          className="flex items-center font-bold text-white opacity-75 hover:opacity-100 duration-200 select-none ml-8"
        >
          <Image src="/MySourceAI-w.png" alt="logo" width={30} height={30} />
          <span className="ml-2 hidden md:block">MySourceAI</span>
        </a>
        
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
          <div className="flex items-center h-auto border border-white border-opacity-40 hover:border-opacity-80 duration-1000 bg-[#0300145e] px-[20px] py-[10px] rounded-lg text-gray-200">
            <a href="#ai-chat" className="cursor-default flex items-center text-white opacity-75 hover:opacity-100 hover:scale-105 font-semibold duration-200 mx-8">
              <img src="/MySourceAI-w.png" alt="AIChat Icon" className="w-5 h-5 mr-2"/>
              AI Chat
            </a>
            <a href="#sources" className="cursor-default font-semibold text-white opacity-75 hover:opacity-100 hover:scale-105 duration-200 mx-8">
            <svg viewBox="0 0 24 24" fill='white' xmlns="http://www.w3.org/2000/svg" className="inline-block mr-3 -mt-1 w-6 h-6">
              <path d="m2.394 15.759s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm0-3.113s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm10.271-9.455c-.246-.128-.471-.191-.692-.191-.223 0-.443.065-.675.191l-8.884 5.005c-.276.183-.414.444-.414.698 0 .256.139.505.414.664l8.884 5.006c.221.133.447.203.678.203.223 0 .452-.065.689-.203l8.884-5.006c.295-.166.451-.421.451-.68 0-.25-.145-.503-.451-.682zm-8.404 5.686 7.721-4.349 7.72 4.349-7.72 4.35z"/>
            </svg>
              Sources
            </a>
            <a href="#settings" className="cursor-default font-semibold text-white opacity-75 hover:opacity-100 hover:scale-105 duration-200 mx-8">
            <svg viewBox="0 0 25 25" fill='white' xmlns="http://www.w3.org/2000/svg" className="inline-block mr-3 -mt-1 w-5 h-5">
              <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/> 
            </svg>
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
          <a href="#ai-chat" className="text-white font-semibold opacity-75 hover:scale-x-105 hover:opacity-100 duration-300">
            AI Chat
          </a>
          <a href="#sources" className="text-white font-semibold opacity-75 hover:scale-x-105 hover:opacity-100 duration-300">
            Sources
          </a>
          <a href="#settings" className="text-white font-semibold opacity-75 hover:scale-x-105 hover:opacity-100 duration-300">
            Settings
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
