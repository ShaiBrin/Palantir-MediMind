"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSharedText } from "@/store";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import client from "@/lib/client";
import { Osdk } from "@osdk/client";
import { PatientSymptoms } from "@hospital-osdk/sdk";

const PatientSelect = () => {
  const [selectedValue, setSelectedValue] = useState("0");
  const[patient, setPatient] =  useState<Osdk.Instance<PatientSymptoms>>();

  const fetchPatientSym = async (ind: number) => {
    const patientSymptoms: Osdk.Instance<PatientSymptoms>[] = [];
    for await (const obj of client(PatientSymptoms).asyncIter()) {
      patientSymptoms.push(obj);
    }
    setPatient(patientSymptoms[ind])
  };

  const dispatch = useDispatch();
  const handleEnter = () => {
    fetchPatientSym(Number(selectedValue))
    dispatch(setSharedText(selectedValue));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Select your patient ID</Typography>
      <Select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        fullWidth
        sx={{ marginTop: 2, marginBottom: 2 }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: 'auto',
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {Array.from({ length: 476 }, (_, i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </Select>

      {patient && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Patient Symptoms:</Typography>
          <div className="patient-symptoms">
            <div className="info">
              <Typography variant="body1">Age: {patient.age}</Typography>
            </div>
            <div className="info">
              <Typography variant="body1">Gender: {patient.gender}</Typography>
            </div>
            <div className="info symptoms-list">
            <Typography variant="body1">Symptoms:</Typography>
                {patient?.symptoms?.length ? (
                  patient.symptoms.map((symptom, index) => (
                    <Typography variant="body2" key={index}>
                      {symptom}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No symptoms available.</Typography>
                )}
            </div>
          </div>
        </Box>
      )}

      <Button
        onClick={handleEnter}
        variant="contained"
        color="primary"
        fullWidth
      >
        Enter
      </Button>
    </Box>
  );
};

export default PatientSelect;