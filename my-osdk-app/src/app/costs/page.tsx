"use client";
import { useState, useEffect } from "react";
import { PatientMedication } from "@hospital-osdk/sdk";
import { Osdk } from "@osdk/client";
import client from "@/lib/client";

const patients: Osdk.Instance<PatientMedication> = await client(PatientMedication).fetchOne(2);
interface MedicationRow  {
  description: string;
  ndcID: number;
  oldPrice: number;
  newPrice: number;
  classification: string;
  percentChange: number;
  reason: string;
  endDate: string;
  effData: string;
};
const CostsPage = () => {
  const [medicationsFound, setMedicationsFound] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const patient = {
    medicationJSON: [
      { name: "TOLTERODINE", dosage: { quantity: 6, measure: "mg", frequency: "once daily" } },
      // { name: "Remdesivir", dosage: { quantity: 200, measure: "mg", frequency: "on day 1, then 100 mg once daily" } },
      { name: "Enoxaparin", dosage: { quantity: 40, measure: "mg", frequency: "once daily" } },
    ],
  };

  // Function to fetch medication data based on description
  const fetchMedication = async (name: string) => {
    try {
      // Call your API endpoint to fetch medication details based on the description
      const response = await fetch(`/api/get-medic?medicationName=${name}`);

      if (!response.ok) {
        throw new Error("Failed to fetch medication data");
      }

      const data = await response.json();
      if (data.medications) {
        console.log("length " + data.medications[0].effData);
        setMedicationsFound((prev) => [...prev, data.medications]); // Add found medication to the list
      } else {
        setMedicationsFound((prev) => [...prev, { description: "", ndcID: 0, oldPrice: 0, newPrice: 0, classification: "", percentChange: 0, reason: "", endDate: "", effData: "" }]); // Not found
      }
    } catch (error: any) {
      setError(error.message);
    }

    // console.log("Pieere " + medicationsFound[0].effData);

  };

  // Function to extract medication names and check them in the database
  useEffect(() => {
    const fetchAllMedications = async () => {
      setLoading(true);
      const names = patient.medicationJSON.map((med) => med.name);
      for (const name of names) {
        console.log("YO " + name);
        await fetchMedication(name);
      }
      setLoading(false);
    };

    fetchAllMedications();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Medications Found</h1>
      {medicationsFound.length > 0 ? (
        <ul>
          {medicationsFound.map((med, index) => (
            <li key={index}>
              <strong>Name:</strong> {med.description || med.description} <br />
              <strong>Classification:</strong> {med.classification || "N/A"} <br />
              <strong>Price Change:</strong> {med.percentChange || "N/A"}% <br />
              <strong>Reason:</strong> {med.reason || "N/A"} <br />
              {med.endDate && <strong>Message:</strong>} {med.newPrice || ""}
            </li>
          ))}
        </ul>
      ) : (
        <div>No medication data found</div>
      )}
    </div>
  );
};

export default CostsPage;