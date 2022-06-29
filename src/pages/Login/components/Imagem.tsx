import { Box, Typography } from '@mui/material';
import React from 'react';
import AppStore from 'assets/appstore.png';
import ImagemCelular from 'assets/img-mobile-hero.png';
import GooglePlay from 'assets/googleplay.png';

export default function Imagem() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Baixe grátis e use também no <br /> seu iPhone ou Android
      </Typography>

      <img
        style={{ width: '500px', padding: '16px' }}
        src={ImagemCelular}
        alt=""
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{ width: '200px', padding: '16px' }}
          src={GooglePlay}
          alt=""
        />
        <img
          style={{ width: '170px', padding: '16px' }}
          src={AppStore}
          alt=""
        />
      </Box>
    </Box>
  );
}
