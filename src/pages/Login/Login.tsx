import { Box, Grid } from '@mui/material';
import React from 'react';
import BoxLogin from './components/FormLogin';
import Imagem from './components/Imagem';

// import Login from '../components/Login/Login';

export default function TelaLogin() {
  return (
    <Grid flexDirection="column" justifyContent="center" alignItems="center">
      <Box
        sx={{
          bgcolor: 'background.default',
          height: '100vh',
          display: 'flex',
        }}
      >
        {/* <Login /> */}
        <Box
          sx={{
            width: '50vw',
            bgcolor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BoxLogin />
        </Box>
        <Box
          sx={{
            width: '50vw',
            bgcolor: '#2754FF',
            display: 'flex',
            alignItems: ' center',
            justifyContent: 'center',
          }}
        >
          <Imagem />
        </Box>
      </Box>
    </Grid>
  );
}
