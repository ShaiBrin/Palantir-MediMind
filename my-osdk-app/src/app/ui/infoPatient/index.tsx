"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import React, { useState, useEffect } from "react";
import client from "@/lib/client";
import { dosageMapping } from "@/utils/DosageMapping";
import { Osdk } from "@osdk/client";
import { PatientMedication } from "@hospital-osdk/sdk";

const patientsMeds: Osdk.Instance<PatientMedication>[] = [];

for await (const obj of client(PatientMedication).asyncIter()) {
  patientsMeds.push(obj);
}

const PatientInformation = () => {
  const sharedText = useSelector((state: RootState) => state.sharedText);
  const [medicationsFound, setMedicationsFound] = useState<any[]>([]);
  const [frequency, setFrequency] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); 
  const num = Number(sharedText);
  const selectedPatientMeds = patientsMeds[num];

  const patientMedicationJson = selectedPatientMeds.medicationJson ? JSON.parse(selectedPatientMeds.medicationJson) : null;

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

  const calculatePrice = () => {
    const updatedMedications = medicationsFound.map((med, index) => {
      const frequencyMultiplier = frequency[index];

      if (frequencyMultiplier) {
        const updatedPrice = med.newprice * frequencyMultiplier ; 
        const roundedPrice = Math.round(updatedPrice * 100) / 100;

        return { ...med, updatedPrice: roundedPrice };
      }

      return { ...med };
    });

    return updatedMedications;
  };

  useEffect(() => {
    setMedicationsFound([]); 
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
  }, [sharedText]); 

  const updatedMedications = calculatePrice();

  useEffect(() => {
    
    const total = updatedMedications.reduce((sum, med) => sum + (med.updatedPrice || 0), 0);
    const roundedTotalPrice = Math.round(total * 100) / 100; 
    setTotalPrice(roundedTotalPrice);
  }, [updatedMedications]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    return (
      <div>
        <p style={{ padding: "8px", fontSize: "16px", border: "1px solid #ccc" }}>
          {"Patient ID: " + sharedText || "No ID selected"}
        </p>
        <div>
      {updatedMedications.map((med, index) => (
      <div
          key={`${med.description}-${index}`}
          style={{
            marginBottom: "20px", 
            padding: "10px",
            borderBottom: "1px solid #ccc", 
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
            <strong>Total Cost (weekly) :</strong> {(totalPrice * 5).toFixed(2)} $   
          </div>
        </div>
      </div>
    );
  };

export default PatientInformation;
