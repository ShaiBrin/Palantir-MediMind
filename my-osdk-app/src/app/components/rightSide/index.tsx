"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CostPerPatient from "./CostPerPatient/patientCost";


const RightSide = () => {
    const sharedText = useSelector((state: RootState) => state.sharedText);
  
    return (
      <div>
        <p style={{ padding: "8px", fontSize: "16px", border: "1px solid #ccc" }}>
          {"Patient ID: " + sharedText || "No ID selected"}
        </p>
        <CostPerPatient sharedText={sharedText} />
      </div>
    );
  };

export default RightSide;
