import { Add } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ButtonReceita() {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '96px',
          height: '92px',
          bgcolor: '#F5F5F5',
          marginLeft: '8px',
          cursor: 'pointer',
        },
        () => ({
          '&:hover': {
            bgcolor: '#01ab92',
            color: '#fff',
            transition: 'all 0.3s',
          },
          '&:hover .MuiBox-root': {
            border: '2px solid #fff',
            transition: 'all 0.3s',
          },
          '&:hover .MuiSvgIcon-root': {
            color: '#fff',
            transition: 'all 0.3s',
          },
          '&:hover .MuiTypography-root': {
            color: '#fff',
            transition: 'all 0.3s',
          },
        }),
      ]}
    >
      <Box
        sx={{
          width: '40px',
          height: '40px',
          border: '2px solid green',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Add sx={{ fontSize: '30px', color: 'green' }} />
      </Box>
      <Typography variant="caption" sx={{ color: 'primary.light' }}>
        Receita
      </Typography>
    </Box>
  );
}
