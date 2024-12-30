"use client";
import { $Objects, $Actions, $Queries, PatientMedication } from "@hospital-osdk/sdk";
import useAuthenticated from "@/lib/useAuthenticated";
import css from "./page.module.css";
import client from "@/lib/client";
import { Osdk } from "@osdk/client";
import { Patient } from "@hospital-osdk/sdk";
import { useEffect, useState } from "react";

const primaryKey = 0;

function Home() {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return null;
  }

  const objectApiNames = Object.keys($Objects);
  const actionApiNames = Object.keys($Actions);
  const queryApiNames = Object.keys($Queries);

  return (
    <div>
      <h1>{"I'm " + authenticated}</h1>
      <p>
        Welcome to your Ontology SDK! Try using any of the following methods
        now.
      </p>
      <h1>
        {/* {responseNoErrorWrapper?.age} */}
      </h1>
      <h3>
        {/* Ontology Object : {osdkProject.} */}
      </h3>
      <div className={css.methods}>
        <div>
          <h2>Objects ({objectApiNames.length})</h2>
          {objectApiNames.map((objectApiName) => (
            <pre key={objectApiName}>
              $Objects.{objectApiName}
              $Objects.{"objectApiName"}
            </pre>
          ))}
        </div>
        <div>
          <h2>Actions ({actionApiNames.length})</h2>
          {actionApiNames.map((actionApiName) => (
            <pre key={actionApiName}>
              $Actions.{actionApiName}
            </pre>
          ))}
        </div>
        <div>
          <h2>Queries ({queryApiNames.length})</h2>
          {queryApiNames.map((queryApiName) => (
            <pre key={queryApiName}>
              $Queries.{queryApiName}
            </pre>
          ))}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default Home;