import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import HoverPopover from 'material-ui-popup-state/HoverPopover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';

import {
  Box,
  Button,
  Typography,

  // Tooltip,
} from '@mui/material';
import { Add } from '@mui/icons-material';

// import dayjs from 'dayjs';

import { useAuth } from 'context/AuthProvider/useAuth';
import DespesaModal from './ExpenseModal';
import ReceitaModal from './RecipeModal';

interface IPropsModal {
  type: any;
  setTotalValue: any;
  changeValue: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
}

export default function ModalMainDespesa({
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsModal) {
  const [openModal, setOpenModal] = React.useState(false);
  const auth = useAuth();

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const [openModalRecipe, setOpenModalRecipe] = React.useState(false);

  const handleClickOpenRecipe = () => {
    setOpenModalRecipe(true);
  };
  const handleClose = () => {
    setOpenModalRecipe(false);
  };
  return (
    <Box>
      <Box sx={{ padding: '0 15px' }}>
        <PopupState variant="popover" popupId="demoPopover">
          {popupState => (
            <div>
              <Box
                {...bindHover(popupState)}
                sx={{
                  width: '35px',
                  height: '35px',
                  bgcolor: '#D95151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <IconButton
                  onClick={handleClickOpen}
                  sx={{ color: 'background.paper' }}
                  aria-label="delete"
                >
                  <Add sx={{ fontSize: '20px' }} />
                </IconButton>
                <HoverPopover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box
                    sx={[
                      {},
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
                        '&:hover .MuiTypography-root': {
                          color: '#fff',
                          transition: 'all 0.3s',
                        },
                      }),
                    ]}
                  >
                    <Button sx={[{ width: '10vw' }]} onClick={handleClickOpen}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.light' }}
                      >
                        Despesa
                      </Typography>
                    </Button>
                  </Box>
                  <Box
                    sx={[
                      {},
                      () => ({
                        '&:hover': {
                          bgcolor: '#01ab92',
                          color: '#fff',
                          transition: 'all 0.3s',
                        },
                        '&:hover .MuiBox-root': {
                          border: '2px solid #fff',
                          transition: 'all 0.3s',
                        },
                        '&:hover .MuiTypography-root': {
                          color: '#fff',
                          transition: 'all 0.3s',
                        },
                      }),
                    ]}
                  >
                    <Button
                      sx={[{ width: '10vw' }]}
                      onClick={handleClickOpenRecipe}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.light' }}
                      >
                        Receita
                      </Typography>
                    </Button>
                  </Box>
                </HoverPopover>
              </Box>
            </div>
          )}
        </PopupState>
        <DespesaModal
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          type={type}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <ReceitaModal
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          type={type}
          openModal={openModalRecipe}
          handleClose={handleClose}
        />
      </Box>
    </Box>
  );
}
