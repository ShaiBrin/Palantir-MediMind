"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSharedText } from "@/store";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";

const PatientSelect = () => {
  const [selectedValue, setSelectedValue] = useState("0"); 
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