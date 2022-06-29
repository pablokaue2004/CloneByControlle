import { Box, Typography } from '@mui/material';
import React from 'react';
import ContasCoartoes from './AccountsAndCards';
import ModalMainDespesa from './ButtonAddRelease';
import PaginacaoDia from './PaginationFilterDate';

interface IPropsMenuAdd {
  type: any;
  setTotalValue: any;
  totalValue: any;
  changeValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
  activeScroll: any;
}

export default function MenuAddReceita({
  type,
  setTotalValue,
  totalValue,
  changeValue,
  categoryFilter,
  accountFilter,
  searchFilter,
  activeScroll,
}: IPropsMenuAdd) {
  return (
    <Box
      sx={{
        height: '73px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '73px',
          width: '852px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 3,
          top: activeScroll ? 0 : null,
          margin: 'auto',
          bgcolor: 'background.paper',
          position: activeScroll ? 'fixed' : null,
          boxShadow: activeScroll ? '0px 5px 8px -7px' : null,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0px 30px',
            marginLeft: '-72px',
          }}
        >
          <Typography variant="body1" sx={{ fontFamily: 'Arial' }}>
            Lançamentos
          </Typography>
          <ModalMainDespesa
            searchFilter={searchFilter}
            accountFilter={accountFilter}
            categoryFilter={categoryFilter}
            totalValue={totalValue}
            changeValue={changeValue}
            setTotalValue={setTotalValue}
            type={type}
          />
        </Box>

        <PaginacaoDia
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          changeValue={changeValue}
          setTotalValue={setTotalValue}
          type={type}
        />
        <ContasCoartoes />
      </Box>
    </Box>
  );
}
