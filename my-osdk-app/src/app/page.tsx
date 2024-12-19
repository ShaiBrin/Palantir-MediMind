"use client";
import { $Objects, $Actions, $Queries, PatientMedication } from "@hospital-osdk/sdk";
import useAuthenticated from "@/lib/useAuthenticated";
import client from "@/lib/client";
import { Osdk } from "@osdk/client";
import HomePageButtons from "./components/ui/HomePageButtons";
import store from "@/store";
import { Provider } from "react-redux";

const responseNoErrorWrapper: Osdk.Instance<PatientMedication> = await client(PatientMedication).fetchOne(2);


function Home() {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return null;
  }


  return (
      <HomePageButtons />
  );
}

export default Home;