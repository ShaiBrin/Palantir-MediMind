"use client";
import React from "react";

export default function CostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack the title on top
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        MediMind
      </div>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexGrow: 1, // This makes the content fill remaining space
          marginTop: "20px",
        }}
      >
        {/* Left side - 1/3 of the width */}
        <div
          style={{
            width: "33.33%", // 1/3 of the width
            padding: "10px", // Adjust padding as needed
            backgroundColor: "#f0f0f0", // Just for visibility
            marginRight: "10px", // Add margin between left and right
          }}
        >
          {/* Left component goes here */}
          <div>Left Side Component</div>
        </div>

        {/* Right side - 2/3 of the width */}
        <div
          style={{
            width: "66.66%", // 2/3 of the width
            padding: "10px", // Adjust padding as needed
            backgroundColor: "#e0e0e0", // Just for visibility
          }}
        >
          {/* Right component goes here */}
          {children}
        </div>
      </div>
    </div>
  );
}
