"use client";
import useAuthenticated from "@/lib/useAuthenticated";
import PatientSelect from "./ui/selectPatient";
import PatientInformation from "./ui/infoPatient";

function Home() {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return null;
  }


  return (
   

    <div className="container">
    
    <div className="left">
      <PatientSelect />
    </div>

    
    <div className="right">
      <PatientInformation />
    </div>
  </div>
);
  
}

export default Home;