import { Box } from '@mui/material';
import React from 'react';

import AcessoRapido from './components/AcessoRapido';
import BoxValorGeral from './components/FieldValorGeral';
import MinhasContas from './components/MinhasContas';

export default function VisaoGeral() {
  return (
    <Box
      sx={{
        width: '890px',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BoxValorGeral />
        <MinhasContas />
      </Box>
      <Box>
        <AcessoRapido />
      </Box>
    </Box>
  );
}
