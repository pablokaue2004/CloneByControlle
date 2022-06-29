import { Box, Switch, Typography } from '@mui/material';
import React from 'react';

export default function DarkMode() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        borderRadius: '0.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ marginLeft: '16px' }}>Teste</Typography>

      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
  );
}
