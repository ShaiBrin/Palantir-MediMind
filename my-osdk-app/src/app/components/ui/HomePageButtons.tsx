import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CleaningServices from '@mui/icons-material/CleaningServices';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

export default function HomePageButtons
() {
  return (
    
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Link href="/patient" passHref>
      <Button variant="contained" color="primary" style={{ borderRadius: '50%', minWidth: '64px', height: '64px', margin: '0 8px' }}>
        <CleaningServices/>
      </Button>
      </Link>
      <Link href="/hospitals
      " passHref>
      <Button variant="contained" color="secondary"  style={{ borderRadius: '50%', minWidth: '64px', height: '64px', margin: '0 8px', }}>
        <PersonIcon/>
      </Button>
      </Link>
    </Box>
  );
}
