import { Add } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import DespesaModal from 'pages/Financeiro/components/ExpenseModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ButtonDespesa() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const handleClick = () => {
    setTimeout(() => {
      console.log('Delayed for 1 second.');

      navigate('/financeiro');
      setTimeout(() => {
        console.log('abriu');
        setOpenModal(true);
      }, 500);
    }, 1000);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '96px',
            height: '92px',
            bgcolor: '#F5F5F5',
            cursor: 'pointer',
          },
          () => ({
            '&:hover': {
              bgcolor: '#D95151',
              color: '#fff',
              transition: 'all 0.3s',
            },
            '&:hover .MuiBox-root': {
              border: '2px solid #fff',
              transition: 'all 0.3s',
            },
            '&:hover .MuiSvgIcon-root': {
              color: '#fff',
              transition: 'all 0.3s',
            },
            '&:hover .MuiTypography-root': {
              color: '#fff',
              transition: 'all 0.3s',
            },
          }),
        ]}
      >
        <Box
          sx={[
            {
              width: '40px',
              height: '40px',
              border: '2px solid red',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Add sx={[{ fontSize: '30px', color: 'red' }]} />
        </Box>
        <Typography variant="caption" sx={[{ color: 'primary.light' }]}>
          Despesa
        </Typography>
      </Box>
      <DespesaModal
        searchFilter={null}
        accountFilter={null}
        categoryFilter={null}
        totalValue={null}
        type={null}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
