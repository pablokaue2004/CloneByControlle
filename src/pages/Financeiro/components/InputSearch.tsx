import { Clear, Search } from '@mui/icons-material';
import { Box, IconButton, InputBase, styled } from '@mui/material';

import React, { useState } from 'react';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: 0,
  float: 'right',
  // padding: '13px 12px 12px 12px',
  transition: theme.transitions.create(['width', 'background-color', 'color']),
  backgroundColor: 'rgba(0,0,0,.1)',

  '& .MuiInputBase-input': {
    padding: '0px 12px',
    height: '56px',
    border: 0,
    marginRight: -theme.spacing(1),
    borderRadius: 0,
    color: 'inherit',
    '&::placeholder': {
      color: 'inherit',
    },
  },
}));

interface IPropsSearch {
  searchFilter: (value: string) => void;
}

export default function InputSerach({ searchFilter }: IPropsSearch) {
  const [activeSearch, setActiveSearch] = useState(false);

  const toggleActiveSearch = () => {
    setActiveSearch(!activeSearch);
  };

  return (
    <>
      <Box>
        <StyledInputBase
          autoFocus
          placeholder="Buscar por..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => searchFilter(e.target.value)}
          sx={{
            ...(activeSearch && {
              width: '100%',
              mr: 0,
            }),
          }}
        />
      </Box>
      <IconButton
        disableRipple
        aria-label="open/close search"
        color="inherit"
        onClick={toggleActiveSearch}
      >
        {activeSearch ? (
          <Clear sx={{ color: 'primary.light' }} />
        ) : (
          <Search sx={{ color: 'primary.light' }} />
        )}
      </IconButton>
    </>
  );
}
