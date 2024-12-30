"use client";
import React from "react";
import LeftSide from "../components/leftSide";
import RightSide from "../components/patient";

export default function CostsLayout({
  sharedText,
  setSharedText,
}: {
  sharedText: string;
  setSharedText: (value: string) => void;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Title */}
      <button
        className="mt-2.5 px-5 py-5 text-2xl font-bold bg-blue-500 text-white border-none rounded cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        MediMind
      </button>

      {/* Main content area */}
      <div className="flex flex-grow flex-row">
        {/* Left side */}
        <div className="flex-initial w-1/3 pt-10 pl-10 pr-5">
            <LeftSide sharedText={sharedText} setSharedText={setSharedText} />
        </div> 

        {/* Right side */}
        <div className="flext-initial w-2/3  pt-10 pr-10 pl-5">
          <RightSide sharedText={sharedText} />
        </div>
      </div>
    </div>
  );
}