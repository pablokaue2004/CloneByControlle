import { AppBar, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { getUser } from 'redux/reducers/userReducer';
import Account from './components/Account';
import Menu from './components/SidBar';
import MenuCentral from './components/MenuCentral';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  // TODO - REMOVER ISTO E USAR O USUARIO LOGADO
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ color: '#fff', px: 2, py: 1 }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        item
        sx={{ mt: 0 }}
      >
        <Grid item>
          <Stack direction="row" alignItems="center">
            <Menu />
            <Typography
              variant="body1"
              sx={{
                marginLeft: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              {/* TODO - USAR O USUARIO LOGADO */}
              {user.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <MenuCentral />
        </Grid>
        <Grid item>
          <Account />
        </Grid>
      </Grid>
    </AppBar>
  );
}
