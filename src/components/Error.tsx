import { Box, Typography } from '@mui/material';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: '#F5F5F5',

        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        style={{ marginTop: '-200px' }}
        src="https://s3-sa-east-1.amazonaws.com/orgnanizze.errorpages/images/404.png"
        alt=""
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#959999',
          padding: '24px',
          marginTop: '40px',
        }}
      >
        Error
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#959999',
          lineHeight: '24px',
          display: 'block',
          textAlign: 'center',
        }}
      >
        Deu erro boy
      </Typography>
    </Box>
  );
}
