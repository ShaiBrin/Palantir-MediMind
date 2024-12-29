"use client";
import { Patient } from "@hospital-osdk/sdk";
import { Osdk } from "@osdk/client";
import { useState, useEffect } from "react";
import CostsLayout from "./layout";
import { client } from "../../lib/client";

export default function CostsPage() {
  const [objects, setObjects] = useState<Osdk.Instance<Patient>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const clientInstance = client && client(Patient);
      if (clientInstance) {
        const tempObjects: Osdk.Instance<Patient>[] = [];
        for await (const obj of clientInstance.asyncIter()) {
          tempObjects.push(obj);
        }
        setObjects(tempObjects);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const object1 = objects[0];

  return (
    <CostsLayout>
     
      <div>
        {loading ? 'Loading...' : object1 ? object1.gender : 'No data available'}
      </div>
    </CostsLayout>
  );
}