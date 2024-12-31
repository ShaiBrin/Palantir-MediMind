import React, { useState, useEffect } from "react";
import { Osdk } from "@osdk/client";
import client from "@/lib/client";
import { dosageMapping } from "../DosageMapping";
import { PatientMedication } from "@hospital-osdk/sdk";

const patientsMeds: Osdk.Instance<PatientMedication>[] = [];

for await (const obj of client(PatientMedication).asyncIter()) {
  patientsMeds.push(obj);
}

const CostPerPatient = ({ sharedText }: { sharedText: string }) => {
  const [medicationsFound, setMedicationsFound] = useState<any[]>([]);
  const [frequency, setFrequency] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const num = Number(sharedText);
  const patientMeds = patientsMeds[num];

  const patientMedicationJson = patientMeds.medicationJson ? JSON.parse(patientMeds.medicationJson) : null;

  // Function to fetch medication data based on description
  const fetchMedication = async (name: string, ind: number) => {
    try {
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
    const updatedMedications = medicationsFound.map((med, index) => {
      // Access the corresponding frequency value from frequency using the same index
      const frequencyMultiplier = frequency[index];

      // Check if the frequency multiplier exists before applying it
      if (frequencyMultiplier) {
        const updatedPrice = med.newprice * frequencyMultiplier ; 
        // Round the price to 2 decimal places
        const roundedPrice = Math.round(updatedPrice * 100) / 100;

        return { ...med, updatedPrice: roundedPrice };
      }

      // If no frequency multiplier is available, return the original medication data
      return { ...med };
    });

    return updatedMedications;
  };

  // Function to extract medication names and check them in the database
  useEffect(() => {
    setMedicationsFound([]); // Reset medicationsFound
    const fetchAllMedications = async () => {
      setLoading(true);
      const names = patientMedicationJson.map((med: any) => med.name);

      let ind = 0;
      for (const name of names) {
        await fetchMedication(name, ind);
        ind += 1;
      }
      setLoading(false);
    };

    fetchAllMedications();
  }, [sharedText]); // Add sharedText to the dependency array

  const updatedMedications = calculatePrice(); // Get the updated medications and calculate total price

  useEffect(() => {
    // Calculate the total price by summing the updatedPrice values and rounding the result to 2 decimal places
    const total = updatedMedications.reduce((sum, med) => sum + (med.updatedPrice || 0), 0);
    const roundedTotalPrice = Math.round(total * 100) / 100; // Round the total price to 2 decimal places
    setTotalPrice(roundedTotalPrice);
  }, [updatedMedications]); // Only re-run when updatedMedications change

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
            <strong>Unit Price:</strong> {med.newprice} $<br />
            <strong>Price Change:</strong> {med.percentchange} % <br />
            <strong>Classification:</strong> {med.classification} <br />
            <strong>Total:</strong> {med.updatedPrice} $<br />
          </li>
        </div>
      ))}
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>
  {/* // Multiply by to know how much it cost per week (5 days) */}
  <strong>Total Cost (weekly) :</strong> {(totalPrice * 5).toFixed(2)} $   
</div>
    </div>
  );
};

export default CostPerPatient;