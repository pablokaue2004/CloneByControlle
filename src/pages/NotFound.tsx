import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
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
        PÁGINA NÃO ENCONTRADA
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
        Infelizmente não encontramos a página que você estava procurando.
        Verifique se a url está correta <br />
        ou tente voltar para a{' '}
        <Link
          style={{
            textDecoration: 'none',
            color: '#00B1EC',
            fontWeight: 'bold',
          }}
          to="/"
        >
          página inicial
        </Link>
        . Se nada der certo, entre em contato com a gente{' '}
        <Link
          style={{
            textDecoration: 'none',
            color: '#00B1EC',
            fontWeight: 'bold',
          }}
          to="/"
        >
          clicando aqui
        </Link>
        .
      </Typography>
    </Box>
  );
}
