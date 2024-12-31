"use client";
import React, { useState, useEffect } from "react";

// Logic to map frequency to multiplier
const dosageMapping = (frequency: string): number => {
  const lowerCaseFrequency = frequency.toLowerCase();

  if (
    lowerCaseFrequency.includes("once a day") ||
    lowerCaseFrequency.includes("once daily") ||
    lowerCaseFrequency.includes("daily") ||
    lowerCaseFrequency.includes("as needed") ||
    lowerCaseFrequency.includes("day 1")
  ) {
    return 1;
  } else if (lowerCaseFrequency.includes("twice daily")) {
    return 2;
  } else if (
    lowerCaseFrequency.includes("three times a day") ||
    lowerCaseFrequency.includes("every 8 hours") ||
    lowerCaseFrequency.includes("before meals")
  ) {
    return 3;
  } else if (
    lowerCaseFrequency.includes("four times daily") ||
    lowerCaseFrequency.includes("every 6 hours")
  ) {
    return 4;
  } else {
    return 1;
  }
};

// Component to calculate and display updated medication prices
const MedicationPrices = ({ medications }: { medications: any[] }) => {
  const calculatePrice = (medications: any[]) => {
    return medications.map((med) => {
      const frequencyMultiplier = dosageMapping(med.dosage.frequency);
      const updatedPrice = med.newPrice * frequencyMultiplier;
      return { ...med, updatedPrice };
    });
  };

  const [updatedMedications, setUpdatedMedications] = useState<any[]>([]);

  useEffect(() => {
    // Update medications when the component mounts
    setUpdatedMedications(calculatePrice(medications));
  }, [medications]);

  return (
    <div>
      <h2>Medications and Updated Prices</h2>
      <ul>
        {updatedMedications.map((med, index) => (
          <li key={index}>
            <strong>Name:</strong> {med.description} <br />
            <strong>Frequency:</strong> {med.dosage.frequency} <br />
            <strong>Price:</strong> {med.newPrice} <br />
            <strong>Updated Price:</strong> {med.updatedPrice} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationPrices;
