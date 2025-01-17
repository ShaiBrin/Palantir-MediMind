"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSharedText } from "@/store";
import { Box, Button, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import client from "@/lib/client";
import { Osdk } from "@osdk/client";
import { PatientSymptoms } from "@hospital-osdk/sdk";

const patientSymptoms: Osdk.Instance<PatientSymptoms>[] = [];

for await (const obj of client(PatientSymptoms).asyncIter()) {
  patientSymptoms.push(obj);
}

const PatientSelect = () => {
  const [selectedValue, setSelectedValue] = useState("0");
  const num = Number(selectedValue);
  const selectedPatientSymp = patientSymptoms[num];

  const dispatch = useDispatch();

  const handleEnter = () => {
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

      {/* Display the patient symptoms above the Enter button */}
      {selectedPatientSymp && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Patient Symptoms:</Typography>
          <div className="patient-symptoms">
            <div className="info">
              <Typography variant="body1">Age: {selectedPatientSymp.age}</Typography>
            </div>
            <div className="info">
              <Typography variant="body1">Gender: {selectedPatientSymp.gender}</Typography>
            </div>
            <div className="info symptoms-list">
              <Typography variant="body1">Symptoms:</Typography>
              {selectedPatientSymp.symptoms.map((symptom, index) => (
                <Typography variant="body2" key={index}>{symptom}</Typography>
              ))}
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