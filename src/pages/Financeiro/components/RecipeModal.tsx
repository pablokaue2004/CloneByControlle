/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { AttachMoney, Check, ThumbDownAlt, ThumbUp } from '@mui/icons-material';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  getCategory,
  createRelease,
  getDailyListing,
} from 'redux/reducers/releasesReducer';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { getAccounts } from 'redux/reducers/accountReducer';
import AddOptions from './ShowAddReleaseOptions';
import { brlMask } from '../Mask';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: 560,
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(49,48,76,.7)',
  },

  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    backgroundColor: 'background.paper',
  },
  '& .MuiButton-root': {
    backgroundColor: '#f0f0f0',
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
    backgroundColor: 'background.paper',
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'background.paper' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#000',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface IPropsModalReceita {
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
  openModal: any;
  handleClose: () => void;
}

export default function ReceitaModal({
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
  openModal,
  handleClose,
}: IPropsModalReceita) {
  const [stateButton, setStateButton] = React.useState(false);
  const { accounts } = useAppSelector(state => state.account);
  const { categories } = useAppSelector(state => state.releases);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      fixed: false,
      installments: false,
      description: '',
      value: 0,
      installment: 0,
      timecourse: '',
      emission: new Date(),
      dueDate: new Date(),
      accountId: Number([0]),
      type: 'receita',
      paidOut: Boolean(),
      categoryId: 1,
      payDay: new Date(),
    },
    validationSchema: Yup.object({
      accountId: Yup.number().test(
        'Acount',
        'Selecione uma conta válida',
        val => val !== 0,
      ),
    }),
    onSubmit: async values => {
      try {
        await dispatch(createRelease(values))
          .then(unwrapResult)
          .then(() => {
            console.log('deu bom');
            dispatch(
              getDailyListing({
                search: searchFilter,
                account: accountFilter,
                category: categoryFilter,
                dayValue: totalValue,
                type,
                date: dayjs().format('YYYY-MM-DD').toString(),
              }),
            );
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'success',
              title: 'Despesa criada com sucesso!',
            });
            formik.resetForm();
            handleClose();
          })
          .catch((error: any) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.error(error);
      }
    },
  });
  const toggleTrue = () => {
    setStateButton(!stateButton);
    formik.setValues(prevState => {
      return { ...prevState, paidOut: true };
    });
  };

  const toggle = () => {
    setStateButton(!stateButton);
  };

  return (
    <div>
      <Box>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={openModal}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Typography
              id="modal-modal-title"
              variant="body1"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Nova Receita
            </Typography>
          </BootstrapDialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <FormControl fullWidth>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    fontSize: '14px',
                    color: 'primary.light',
                    marginTop: '24px',
                  }}
                >
                  Descrição
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <TextField
                    sx={{
                      width: '100%',
                      borderRadius: '3px',
                    }}
                    id="description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </Box>
                <Box>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              </FormControl>

              <Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Valor
                      </Typography>

                      <TextField
                        style={{
                          width: '100px',
                          borderRadius: '3px',
                        }}
                        name="value"
                        id="value"
                        type="text"
                        onChange={e =>
                          formik.handleChange(brlMask.currencyBrlMask(e))
                        }
                        value={formik.values.value}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoney
                                sx={{
                                  fontSize: '20px',
                                  marginLeft: '-0.7rem',
                                  marginRight: '-0.8rem',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Emissão
                      </Typography>

                      <OutlinedInput
                        style={{
                          width: '180px',
                          borderRadius: '3px',
                        }}
                        name="emission"
                        id="emission"
                        type="Date"
                        onChange={formik.handleChange}
                        value={formik.values.emission}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Vencimento
                      </Typography>

                      <OutlinedInput
                        style={{
                          width: '180px',
                          borderRadius: '3px',
                        }}
                        name="dueDate"
                        id="dueDate"
                        type="Date"
                        onChange={formik.handleChange}
                        value={formik.values.dueDate}
                      />
                    </Box>
                    {stateButton ? (
                      <IconButton
                        onClick={toggle}
                        sx={{ marginTop: '8%' }}
                        aria-label="delete"
                        name="paidOut"
                        id="paidOut"
                      >
                        <ThumbUp sx={{ color: '#39AB91' }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-invalid="false"
                        onClick={toggleTrue}
                        sx={{ marginTop: '8%' }}
                        aria-label="delete"
                      >
                        <ThumbDownAlt />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>

              {stateButton ? (
                <Box
                  sx={{
                    bgcolor: '#E4EBFF',
                    height: '10vh',
                    marginLeft: '-16px',
                    marginRight: '-16px',
                    padding: '16px',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ marginTop: '-18px' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Pagamento
                      </Typography>

                      <OutlinedInput
                        style={{
                          width: '170px',
                          borderRadius: '3px',
                          backgroundColor: 'background.paper',
                        }}
                        name="payDay"
                        id="payDay"
                        type="Date"
                        onChange={formik.handleChange}
                        value={formik.values.payDay}
                      />
                    </Box>
                    <Box sx={{ marginTop: '-18px' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Multa
                      </Typography>

                      <OutlinedInput
                        style={{
                          width: '100px',
                          borderRadius: '3px',
                          backgroundColor: 'background.paper',
                        }}
                        disabled
                        name="valor"
                        id="valor"
                        type="text"
                        // onChange={formik.handleChange}
                        // value={formik.values.valor}
                      />
                    </Box>
                    <Box sx={{ marginTop: '-18px' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'primary.light',
                          marginTop: '24px',
                        }}
                      >
                        Juros
                      </Typography>

                      <OutlinedInput
                        style={{
                          width: '100px',
                          borderRadius: '3px',
                          backgroundColor: 'background.paper',
                        }}
                        disabled
                        name="valor"
                        id="valor"
                        type="text"
                        // onChange={formik.handleChange}
                        // value={formik.values.valor}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : null}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: 'primary.light',
                      marginTop: '24px',
                    }}
                  >
                    Conta
                  </Typography>

                  <FormControl fullWidth>
                    <Select
                      sx={{ width: '230px' }}
                      labelId="demo-simple-select-label"
                      id="accountId"
                      value={formik.values.accountId}
                      onChange={formik.handleChange}
                      name="accountId"
                    >
                      <MenuItem
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        disabled
                        value={0}
                      />
                      {accounts?.map(conta => (
                        <MenuItem
                          key={conta.id}
                          value={conta.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          {conta.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {formik.errors.accountId}
                    </FormHelperText>
                  </FormControl>
                  {formik.touched.accountId && formik.errors.accountId ? (
                    <Typography variant="body2">
                      {formik.errors.accountId}
                    </Typography>
                  ) : null}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: 'primary.light',
                      marginTop: '24px',
                    }}
                  >
                    Categoria
                  </Typography>

                  <FormControl fullWidth>
                    <Select
                      sx={{
                        width: '230px',
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.categoryId}
                      onChange={formik.handleChange}
                      name="categoryId"
                    >
                      {categories?.map(categoria => (
                        <MenuItem
                          key={categoria.id}
                          value={categoria.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          {categoria.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <AddOptions formik={formik} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <Box
                  sx={{
                    width: '60px',
                    height: '60px',
                    bgcolor: '#D95151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  <IconButton type="submit" aria-label="delete">
                    <Check
                      sx={{ fontSize: '30px', color: 'background.paper' }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </DialogContent>
          </form>
        </BootstrapDialog>
      </Box>
    </div>
  );
}
