"use client";
import { useState, useEffect } from "react";

const CostsPage = () => {
  const [medication, setMedication] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ndcID = 59762080006; // Example NDC ID, you can change this as needed

  // Function to fetch medication data based on NDC ID
  const fetchMedication = async (ndcID: number) => {
    try {
      // Call your API endpoint to fetch medication details
      const response = await fetch(`/api/get-medic?ndcID=${ndcID}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch medication data");
      }

      const data = await response.json();
      setMedication(data.medications); // Assuming the response structure contains the medications
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedication(ndcID); // Fetch medication data when the component mounts
  }, [ndcID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Medications</h1>
      <div>
        {medication ? (
          <div>
            <h2>Medication Details</h2>
            <ul>
              {medication.map((med: any, index: number) => (
                <li key={index}>
                  <strong>Description:</strong> {med.description} <br />
                  <strong>Classification:</strong> {med.classification} <br />
                  <strong>Price Change:</strong> {med.percentChange}% <br />
                  <strong>Reason:</strong> {med.reason}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No medication found for this NDC ID</div>
        )}
      </div>
    </div>
  );
};

export default CostsPage;
