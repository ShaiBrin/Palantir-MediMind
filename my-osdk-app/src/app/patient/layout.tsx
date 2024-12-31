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
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }}
    >
      {/* Title */}
      <button
        style={{
          marginTop: "10px",
          padding: "20px 20px",
          fontSize: "2rem",
          fontWeight: "bold",
          backgroundColor: "#007BFF",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => window.location.href = "/"}
      >
        MediMind
      </button>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexGrow: 1,
          marginTop: "15px",
          padding: "20px"
        }}
      >
        {/* Left side */}
        <div
          style={{
            width: "33.33%",
            padding: "10px",
            backgroundColor: "#ADD8E6",
            marginRight: "20px",
            color: "#000000",
            marginBottom: "30px"
          }}
        >
          <LeftSide sharedText={sharedText} setSharedText={setSharedText} />
        </div>

        {/* Right side */}
        <div
          style={{
            width: "66.66%",
            padding: "10px",
            backgroundColor: "#E0E0E0",
            color: "#000000",
            marginBottom: "30px",
            marginLeft: "20px"
          }}
        >
          <RightSide sharedText={sharedText} />
        </div>
      </div>
    </div>
  );
}