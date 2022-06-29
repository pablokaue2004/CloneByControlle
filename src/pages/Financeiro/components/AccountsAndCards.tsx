import { ArrowDropDownTwoTone } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ContasCoartoes() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Link style={{ textDecoration: 'none' }} to="/addAccount">
        <Typography
          variant="body2"
          sx={{ color: 'primary.main', padding: '10px' }}
        >
          Contas
        </Typography>
      </Link>

      <IconButton sx={{ height: '40px' }} aria-label="ArrowDown">
        <ArrowDropDownTwoTone sx={{ fontSize: '23px' }} />
      </IconButton>
    </Box>
  );
}
