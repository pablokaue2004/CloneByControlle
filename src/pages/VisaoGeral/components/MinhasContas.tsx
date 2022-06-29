import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { getAccounts } from 'redux/reducers/accountReducer';

export default function MinhasContas() {
  const { accounts } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: '450px',
        height: accounts?.length === 0 ? '184px' : '100%',
        bgcolor: '#FFFFFF!important',
        boxShadow: '0px 4px 4px primary.contrastText',
        borderRadius: '2px',
        display: 'flex',
        marginTop: '24px',
        flexDirection: 'column',
        borderBottom: '8px solid #FFFFFF',
      }}
    >
      <Typography
        sx={{ padding: '16px', fontWeight: 'bold', color: '#31304c' }}
      >
        Minhas Contas
      </Typography>
      <Box>
        {accounts?.map(accountList => (
          <Box key={accountList.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ padding: 2, display: 'flex' }}>
                <img
                  style={{ width: 50 }}
                  src="https://s3-sa-east-1.amazonaws.com/zze-front.controlle.com/1.7.42/images/application/banks/other-f90ae7a604.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: 'flex',
                    marginLeft: 2,
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="body1" sx={{ color: '#5076ff' }}>
                    {accountList.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9797ad' }}>
                    {accountList.bank.name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      accountList.openingBalance < 0 ? '#F35B5B' : '#5076ff',
                    marginRight: 2,
                  }}
                >
                  R$ {accountList.openingBalance}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Divider sx={{ width: '95%' }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
