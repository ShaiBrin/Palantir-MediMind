import React, { useState, useEffect } from "react";
import { Osdk } from "@osdk/client";
import client from "@/lib/client";
import { PatientMedication } from "@hospital-osdk/sdk";
const patientsMeds: Osdk.Instance<PatientMedication>[] = [];

for await (const obj of client(PatientMedication).asyncIter()) {
  patientsMeds.push(obj);
}

const CostForPatients = () => {
  const [medicationsFound, setMedicationsFound] = useState<any[]>([]);
  const [frequency, setFrequency] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    const fetchAllMedications = async () => {
      for (let i = 0; i <= 10; i++) {
        const patientMeds = patientsMeds[i];
        const patientMedicationJson = patientMeds.medicationJson ? JSON.parse(patientMeds.medicationJson) : null;

        if (patientMedicationJson) {
          for (let j = 0; j < patientMedicationJson.length; j++) {
            await fetchMedication(patientMedicationJson[j].description, j, patientMedicationJson);
          }
        }
      }
      setLoading(false);
    };

    fetchAllMedications();
  }, []);

  // Function to fetch medication data based on description
  const fetchMedication = async (name: string, ind: number, patientMedicationJson: any) => {
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
        setFrequency((prev) => [...prev, freq]);
      } else {
        console.warn(`No medication data found for ${name}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Medications Found</h1>
          {/* Render medications and other data here */}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CostForPatients;