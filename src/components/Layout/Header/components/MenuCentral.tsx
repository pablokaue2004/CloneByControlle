import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// import Calculadora from './Calculadora';
export default function MenuCentral() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        style={{
          textDecoration: 'none',
        }}
        to="/"
      >
        <Box>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'background.paper',
            }}
            variant="body2"
          >
            Visão Geral
          </Typography>
        </Box>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/financeiro">
        <Box sx={{ marginLeft: '16px' }}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'background.paper',
            }}
            variant="body2"
          >
            Financeiro
            <KeyboardArrowDown sx={{ color: 'background.paper' }} />
          </Typography>
        </Box>
      </Link>
      <Box sx={{ marginLeft: '16px' }}>{/* <Calculadora /> */}</Box>
    </Box>
  );
}
