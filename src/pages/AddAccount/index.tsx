import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export default function AddAccount() {
  const listTest = [
    { label: 'Testelist' },
    { label: 'Testelist' },
    { label: 'Testelist' },
    { label: 'Testelist' },
    { label: 'Testelist' },
  ];
  return (
    <Box>
      <Box>
        <Typography sx={{ color: '#31304c', marginLeft: '16px' }}>
          Contas
        </Typography>
      </Box>
      <Grid container direction="row">
        {listTest.map(list => (
          <Box
            sx={{
              marginLeft: '16px',
              marginTop: '16px',
              width: '400px',
              height: '212px',
              bgcolor: 'background.paper',
            }}
          >
            {list.label}
          </Box>
        ))}
        <Box
          sx={[
            {
              marginLeft: '16px',
              marginTop: '16px',
              width: '400px',
              height: '212px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              color: 'primary.light',
              borderStyle: 'dashed',
              cursor: 'pointer',
            },
            () => ({
              '&:hover': {
                color: 'primary.main',
                transition: 'all 0.3s',
              },
            }),
          ]}
        >
          + nova conta
        </Box>
      </Grid>
    </Box>
  );
}
