/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import { Delete, EditTwoTone } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { getDetails } from 'redux/reducers/releasesReducer';
import { useAppSelector } from 'redux/hooks/useAppSelector';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(49,48,76,.7)',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface IPropsModal {
  id: number | null;
  openModal: any;
  setOpenModal: any;
}

export default function Details({ openModal, setOpenModal, id }: IPropsModal) {
  const { details } = useAppSelector(state => state.releases);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

  return (
    <Box>
      <BootstrapDialog
        onClose={() => setOpenModal((prev: any) => !prev)}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <Box key={id} sx={{ width: '470px', height: '500px' }}>
          <Box
            sx={{
              height: '142px',
              bgcolor:
                details.release?.type === 'despesa' ? '#f35b5b' : '#25ba6e',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ padding: '32px', width: '470px' }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'background.paper',
                    fontWeight: 'bold',
                    overflowWrap: 'break-word',
                    overflowX: 'auto',
                  }}
                >
                  {details?.release?.description}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: 'background.paper', fontWeight: 'bold' }}
                >
                  {details?.release?.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'background.paper',
                    opacity: '0.7',
                    marginTop: '8px',
                  }}
                >
                  Lançada por {user.name} em{' '}
                  {dayjs(details.release?.releaseAt).format('DD/MM/YYYY')} às{' '}
                  {dayjs(details.release?.releaseAt).format('HH:mm')}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '382px',

                padding: '30px 44px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '400',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '15px',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      Emissão
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#31304c' }}>
                      {details?.release?.emission}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      {details.release?.type !== 'despesa'
                        ? 'Recebimento'
                        : 'Pagamento'}
                    </Typography>
                    {details?.release?.payDay === null ? (
                      <Typography variant="body2" sx={{ color: '#31304c' }}>
                        --
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#31304c' }}>
                        {details?.release?.payDay}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      Conta
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main' }}>
                      {details?.account?.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',

                    padding: '15px',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      Vencimento
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#31304c' }}>
                      {details?.release?.dueDate}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      Categoria
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#31304c' }}>
                      {details?.category?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>
                    <Typography variant="body2" sx={{ color: 'primary.light' }}>
                      Tags
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#31304c' }}>
                      --
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  align: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: '24px',
                }}
              >
                <Stack direction="row" spacing={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <IconButton
                      sx={{ border: '1px solid primary.light' }}
                      aria-label="delete"
                    >
                      <EditTwoTone sx={{ color: 'primary.light' }} />
                    </IconButton>
                    <Typography fontSize="12px" sx={{ color: '#31304c' }}>
                      Editar
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <IconButton
                      sx={{ border: '1px solid primary.light' }}
                      aria-label="delete"
                    >
                      <Delete sx={{ color: 'primary.light' }} />
                    </IconButton>
                    <Typography fontSize="12px" sx={{ color: '#31304c' }}>
                      Deletar
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </Box>
  );
}
