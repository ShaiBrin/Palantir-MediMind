"use client";
import { useState, useEffect } from "react";
import { PatientMedication } from "@hospital-osdk/sdk";
import { Osdk } from "@osdk/client";
import client from "@/lib/client";
import { dosageMapping } from "../components/rightSide/DosageMapping";


// const dosageMapping = (frequency: string): number => {
//   const lowerCaseFrequency = frequency.toLowerCase();

//   if (
//     lowerCaseFrequency.includes("once a day") ||
//     lowerCaseFrequency.includes("once daily") ||
//     lowerCaseFrequency.includes("daily") ||
//     lowerCaseFrequency.includes("as needed") ||
//     lowerCaseFrequency.includes("day 1")
//   ) {
//     return 1;
//   } else if (lowerCaseFrequency.includes("twice daily")) {
//     return 2;
//   } else if (
//     lowerCaseFrequency.includes("three times a day") ||
//     lowerCaseFrequency.includes("every 8 hours") ||
//     lowerCaseFrequency.includes("before meals")
//   ) {
//     return 3;
//   } else if (
//     lowerCaseFrequency.includes("four times daily") ||
//     lowerCaseFrequency.includes("every 6 hours")
//   ) {
//     return 4;
//   } else {
//     return 1;
//   }
// };
const patients: Osdk.Instance<PatientMedication> = await client(PatientMedication).fetchOne(2);

const CostsPage = () => {
  const [medicationsFound, setMedicationsFound] = useState<any[]>([]);
  const [frequency, setFrequency] =  useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("Patient data:", patients.medicationJson);
  const patientMedicationJson = patients.medicationJson ? JSON.parse(patients.medicationJson) : null;

  // Function to fetch medication data based on description
  const fetchMedication = async (name: string, ind:number) => {
    try {
      console.log(`Fetching medication: ${name}`);
      const response = await fetch(`/api/get-medic?medicationName=${name}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch medication data for ${name}`);
      }

      const data = await response.json();
      console.log(`Response data for ${name}:`, data.medications);

      if (data.medications) {
        setMedicationsFound((prev) => [...prev, ...data.medications]); // Flatten and append
        const freq = patientMedicationJson.map((med: any) => med.dosage.frequency);
        const fre = dosageMapping(freq[ind]);
        console.log("Frequency:", fre);
        setFrequency((prev) => [...prev, fre]);
      } else {
        console.warn(`No medication data found for ${name}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  
   // Function to calculate updated price based on frequency
   const calculatePrice = () => {
    return medicationsFound.map((med, index) => {
      // Access the corresponding frequency value from frequencyZ using the same index
      const frequencyMultiplier = frequency[index]; 
  
      // Check if the frequency multiplier exists before applying it
      if (frequencyMultiplier) {
        const updatedPrice = med.newprice * frequencyMultiplier;
        return { ...med, updatedPrice };
      }
  
      // If no frequency multiplier is available, return the original medication data
      return { ...med };
    });
  };

  // Function to extract medication names and check them in the database
  useEffect(() => {
    const fetchAllMedications = async () => {
      setLoading(true);
      const names = patientMedicationJson.map((med: any) => med.name);

      let ind = 0;
      for (const name of names) {
        await fetchMedication(name, ind);
        ind+=1
      }
      setLoading(false);
    };

    fetchAllMedications();
  }, []);

  const updatedMedications = calculatePrice();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {updatedMedications.map((med, index) => (
        <div
          key={`${med.description}-${index}`}
          style={{
            marginBottom: "20px", // Add space between each medication
            padding: "10px", // Optional padding for better layout
            borderBottom: "1px solid #ccc", // Optional: A line separator for clarity
          }}
        >
          <li style={{ listStyle: "none" }}>
            <strong>Name:</strong> {med.description} <br />
            {/* <strong>Frequency:</strong> {med.dosage.frequency} <br /> */}
            <strong>Price:</strong> {med.newprice} <br />
            <strong>Price Change:</strong> {med.percentchange} % <br />
            <strong>Classification:</strong> {med.classification} <br />
            <strong>Total Cost:</strong> {med.updatedPrice} <br />
          </li>
        </div>
      ))}
    </div>
  );
};

export default CostsPage;