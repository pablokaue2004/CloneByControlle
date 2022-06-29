import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { Calculate, Close } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
    width: 320,
    height: 320,
  },

  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(49,48,76,.7)',
  },

  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E8EAEB',
    },
    '&:hover fieldset': {
      borderColor: '#E8EAEB',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
    },
  },
  '& .MuiPopover-paper': {
    backgroundColor: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Calculadora() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        sx={{ color: 'background.paper' }}
        onClick={handleClickOpen}
        aria-label="delete"
      >
        <Calculate />
      </IconButton>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              sx={{
                width: '320px',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontSize: '32px',
                  color: 'primary.dark',
                  padding: '16px',
                }}
              >
                0
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '8px',
                  marginTop: '-16px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: '#ff7373',
                  }}
                >
                  Limpar
                </Typography>
                <IconButton onClick={handleClose} aria-label="delete">
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ color: 'primary.light', fontSize: '18px' }}>
                  7
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                8
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                9
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                +/-
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                %
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                4
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                5
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                6
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                +
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                -
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                1
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                2
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                3
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                x
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                /
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                0
              </Box>
              <Box
                sx={{
                  width: '63px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                .
              </Box>
              <Box
                sx={{
                  width: '191px',
                  height: '55px',
                  border: '0.1px solid primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                =
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
