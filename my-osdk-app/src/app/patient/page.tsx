"use client";

import { useState } from "react";
import CostsLayout from "./layout";

const Page = () => {
  const [sharedText, setSharedText] = useState(""); // Shared state

  return (
    <CostsLayout sharedText={sharedText} setSharedText={setSharedText} />
  );
};

export default Page;
