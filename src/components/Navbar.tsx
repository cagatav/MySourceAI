import Image from "next/image";
import React from "react";
const Navbar = () => {
  return (
  <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#000000]/50 bg-[#03001417] backdrop-blur-md z-40">
    <div className="flex justify-center">
      <div className="h-[65px] fixed top-0 shadow-lg z-50">
        <div className="w-[500px] h-full flex flex-row items-center">
          <div className="flex justify-between w-full h-auto border border-[#ffffff69] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-lg text-gray-200">
            <a href="#ai-chat" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200">
              AI Chat
            </a>
            <a href="#sources" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200">
              Sources
            </a>
            <a href="#settings" className="cursor-pointer font-semibold hover:scale-110 hover:text-white duration-200">
              Settings
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-[65px] fixed top-0 px-10">
        <div className="h-full flex">
          <a href="#"
            className="h-auto w-auto flex flex-row items-center hover:scale-110 hover:text-white duration-500 select-none">
            <Image
            src="/MySourceAI-w.png"
            alt="logo"
            width={30}
            height={30}
            className="cursor-pointer"/>
            <span className="font-bold ml-[10px] hidden md:block text-gray-300 ">
            MySourceAI
            </span>
          </a>
        </div>
    </div>
  </div>
</div>
  );
};
export default Navbar;
