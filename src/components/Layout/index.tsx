import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';

import LogoFooter from 'assets/logoDown.svg';

import Header from './Header/Header';

function Layout() {
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Outlet />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img style={{ padding: '32px' }} src={LogoFooter} alt="LogoDown" />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Layout;
