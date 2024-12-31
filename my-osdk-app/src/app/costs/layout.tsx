"use client";
import React from "react";
import LeftSide from "../components/leftSide";
import RightSide from "../components/rightSide";

export default function CostsLayout({
  sharedText,
  setSharedText,
}: {
  sharedText: string;
  setSharedText: (value: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        marginTop: "20px",
        backgroundColor: "#121212",
        color: "#FFFFFF",
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
          flexGrow: 1,
          marginTop: "20px",
        }}
      >
        {/* Left side */}
        <div
          style={{
            width: "33.33%",
            padding: "10px",
            backgroundColor: "#1E1E1E",
            marginRight: "10px",
            color: "#FFFFFF",
          }}
        >
          <LeftSide sharedText={sharedText} setSharedText={setSharedText} />
        </div>

        {/* Right side */}
        <div
          style={{
            width: "66.66%",
            padding: "10px",
            backgroundColor: "#292929",
            color: "#FFFFFF",
          }}
        >
          <RightSide sharedText={sharedText} />
        </div>
      </div>
    </div>
  );
}
