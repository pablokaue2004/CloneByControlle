import { Box, Skeleton, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import getSalutationMessage from 'utils/getSalutationMassage';
import numberCurrencyFormart from 'utils/numberCurrencyFormart';

export default function BoxValorGeral() {
  const { user } = useAppSelector(state => state.user);

  const tempododia = getSalutationMessage();

  return (
    <Box>
      {user.id === 0 ? (
        <Box
          sx={{
            width: '450px',
            height: '223px',
            bgcolor:
              user.openingBalance > 0
                ? '#57D3FF!important'
                : '#e95757!important',
            boxShadow: '0px 4px 4px primary.contrastText',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Skeleton width="17rem" variant="text" />
          <Skeleton variant="rectangular" width="17rem" height="3rem" />
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 'bold' }}
          >
            Saldo Geral
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: '450px',
            height: '223px',
            bgcolor:
              user.openingBalance > 0
                ? '#57D3FF!important'
                : '#e95757!important',
            boxShadow: '0px 4px 4px primary.contrastText',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'background.paper' }}
          >
            {tempododia}, {user.name}!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              R$
            </Typography>
            <Typography
              sx={{ fontSize: '37px', color: '#fff', fontWeight: 'bold' }}
            >
              {numberCurrencyFormart(user?.openingBalance)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 'bold' }}
          >
            Saldo Geral
          </Typography>
        </Box>
      )}
    </Box>
  );
}
