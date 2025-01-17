"use client";
import useAuthenticated from "@/lib/useAuthenticated";
import PatientSelect from "./ui/selectPatient";
import PatientInformation from "./ui/infoPatient";
import styles from "./page.module.css";

function Home() {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return null;
  }

  return (

    <div className={styles.container}>
      <div className={styles.left}>
      <PatientSelect />
    </div>
  
    <div className={styles.right}>
      <PatientInformation />
    </div>
  </div>
);
  
}

export default Home;