import React from "react";
import { images } from "../assets/images";

interface MenuProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Menue({ collapsed, onToggle }: MenuProps) {
  return (
    <div
      className={`
        bg-[#e9eef6] h-screen flex flex-col transition-all duration-300
        ${collapsed ? "w-[70px]" : "w-full"}
      `}
    >
      {/* Top Bar */}
      <div className="flex flex-row justify-between mx-3 mt-10">
        {/* Toggle button */}
        <button
          className="w-10 h-10 cursor-pointer hover:bg-gray-300 flex justify-center items-center rounded-full"
          onClick={onToggle}
        >
          <img className="w-5 h-5" src={images.menue} alt="" />
        </button>

        {/* Hide search when collapsed */}
        {!collapsed && (
          <button className="w-10 h-10 cursor-pointer hover:bg-gray-300 flex justify-center items-center rounded-full">
            <img className="w-5 h-5" src={images.search} alt="" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="flex flex-col mx-3 mt-10">
         <span>chat</span>
        </div>
        
      )}
        {!collapsed && (
        <div className="flex flex-col mx-3 mt-10">
         <span>settings</span>
        </div>
        
      )}
      
    </div>
  );
}
