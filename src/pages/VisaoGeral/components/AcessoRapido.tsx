import { Box, Typography } from '@mui/material';
import React from 'react';
import ButtonDespesa from './ButtonDespesa';
import ButtonReceita from './ButtonReceita';

export default function AcessoRapido() {
  return (
    <Box>
      <Box
        sx={{
          marginLeft: '24px',
          width: '450px',
          height: '184px',
          bgcolor: '#FFFFFF!important',
          boxShadow: '0px 4px 4px primary.contrastText',
          borderRadius: '2px',
        }}
      >
        <Typography
          sx={{ padding: '16px', fontWeight: 'bold', color: '#31304c' }}
        >
          Acesso Rápido
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
          <ButtonDespesa />
          <ButtonReceita />
        </Box>
      </Box>
    </Box>
  );
}
