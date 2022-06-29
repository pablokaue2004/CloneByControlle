import { FilterListTwoTone, Search } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

export default function BoxFiltrar() {
  return (
    <Box
      sx={{
        height: '45px',
        bgcolor: '#F4F4F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '24px',
          justifyContent: 'center',
        }}
      >
        <IconButton aria-label="ArrowLeft">
          <FilterListTwoTone sx={{ color: 'primary.light' }} />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ color: 'primary.light', fontWeight: 'bold' }}
        >
          Filtrar por...
        </Typography>
      </Box>
      <Box sx={{ padding: '24px' }}>
        <IconButton aria-label="ArrowLeft">
          <Search sx={{ color: 'primary.light' }} />
        </IconButton>
      </Box>
    </Box>
  );
}
