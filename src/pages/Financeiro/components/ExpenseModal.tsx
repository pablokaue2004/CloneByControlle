/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
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
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import {
  createRelease,
  activeItemList,
  getDailyListing,
  getCategory,
} from 'redux/reducers/releasesReducer';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { getAccounts } from 'redux/reducers/accountReducer';
import { brlMask } from '../Mask';
import AddOptions from './ShowAddReleaseOptions';

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

interface IPropsModalDespesa {
  openModal: any | null;
  setOpenModal: any | null;
  type: any | null;
  totalValue: any | null;
  categoryFilter: any | null;
  accountFilter: any | null;
  searchFilter: any | null;
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

interface FormValues {
  description: string;
  value: number;
  emission: Date;
  dueDate: Date;
  accountId: number;
  type: string;
  paidOut: boolean;
  categoryId: number;
  payDay: Date;
  fixed: boolean;
  installments: boolean;
  installment: number;
  timecourse: string;
}

export default function DespesaModal({
  openModal,
  setOpenModal,
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsModalDespesa) {
  const [stateButton, setStateButton] = React.useState(false);
  const { accounts } = useAppSelector(state => state.account);
  const { categories } = useAppSelector(state => state.releases);

  // const [openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAccounts());
    dispatch(getCategory());
  }, [dispatch]);

  const initialValues: FormValues = {
    description: '',
    value: 0,
    emission: new Date(),
    dueDate: new Date(),
    accountId: Number([0]),
    type: 'despesa',
    paidOut: Boolean(),
    categoryId: 1,
    payDay: new Date(),
    fixed: false,
    installments: false,
    installment: 1,
    timecourse: '',
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: Yup.object({
      accountId: Yup.number().test(
        'Account',
        'Selecione uma conta válida',
        val => val !== 0,
      ),
      description: Yup.string()
        .min(4, 'Sua descrição deve ter no minímo 4 caracteres')
        .max(25, 'Sua descrição deve ter no máximo 25 caracteres'),
    }),
    onSubmit: async values => {
      try {
        if (values) {
          const data: FormValues = {
            ...values,
            value: Number(brlMask.stringToNumber(values.value)),
          };
          await dispatch(createRelease(values))
            .then(unwrapResult)
            .then(response => {
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
              dispatch(activeItemList(response.id));
              console.log(activeItemList(response.id));

              console.log('deu bom');

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
              console.log(error.response?.data.message);
            });
        }
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
    <Box>
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
              Nova Despesa
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
                    placeholder="Digite uma descrição"
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
                          Number(
                            formik.handleChange(brlMask.currencyBrlMask(e)),
                          )
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
                        type="date"
                        placeholder={dayjs().format('DD/MM/YYYY')}
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
                      //
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
                  <IconButton
                    //
                    type="submit"
                    aria-label="delete"
                  >
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
    </Box>
  );
}
