"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSharedText } from "@/store";

const LeftSide = () => {
    const [selectedValue, setSelectedValue] = useState("0"); // State for dropdown
    const dispatch = useDispatch();
  
    const handleEnter = () => {
      dispatch(setSharedText(selectedValue)); // Update the Redux state
    };
  
    return (
      <div>
        <h2>Select your patient ID</h2>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", width: "100%" , color:"black"}}
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <button
          onClick={handleEnter}
          style={{
            marginTop: "10px",
            padding: "8px",
            fontSize: "16px",
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    );
  };
  
  export default LeftSide;
