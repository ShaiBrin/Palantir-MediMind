"use client";
import { Patient, PatientMedication } from "@hospital-osdk/sdk";
import { Osdk } from "@osdk/client";
import { useState, useEffect } from "react";
import CostsLayout from "./layout";
import client from "@/lib/client";

const responseNoErrorWrapper: Osdk.Instance<PatientMedication> = await client(PatientMedication).fetchOne(2);

function MyComponent() {
  return (
    <CostsLayout>
      <div>
        {responseNoErrorWrapper.gender}
      </div>
    </CostsLayout>
  );
}

export default MyComponent;
