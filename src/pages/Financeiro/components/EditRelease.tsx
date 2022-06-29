import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import NumberFormat from 'react-number-format';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import {
  AttachMoneyTwoTone,
  Check,
  ThumbDownAlt,
  ThumbUp,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import AddOptions from './ShowAddReleaseOptions';
import { unwrapResult } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import {
  editRelease,
  putRelease,
  editValueRealease,
  getCategory,
  getDailyListing,
  editTypeRealease,
  getDetails,
} from 'redux/reducers/releasesReducer';
import { getAccounts } from 'redux/reducers/accountReducer';
import AddOptions from './ShowAddReleaseOptions';

interface CustomProps {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

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

const NumberFormatCustom = React.forwardRef<
  NumberFormat<CustomProps>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={valuess => {
        onChange({
          target: {
            name: props.name,
            value: Number(valuess.value),
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
});

interface IPropsEdit {
  id: number | null;
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
  handleCloseEdit: () => void;
  openModalEdit: any;
}

export default function ButtonEditarList({
  id,
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
  openModalEdit,
  handleCloseEdit,
}: IPropsEdit) {
  const { details } = useAppSelector(state => state.releases);
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
  React.useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      id,
      description: details?.release?.description,
      value: details?.release?.value,
      emission: details?.release?.emission,
      dueDate: details?.release?.dueDate,
      accountId: details?.release?.accountId,
      type: details?.release?.type,
      paidOut: details?.release?.paidOut,
      categoryId: 1,
      payDay: details?.release?.payDay,
      fixed: false,
      installments: false,
      installment: 1,
      timecourse: '',
    },
    validationSchema: Yup.object({
      accountId: Yup.number().test(
        'Account',
        'Selecione uma conta válida',
        val => val !== 0,
      ),
    }),
    onSubmit: async values => {
      try {
        if (values) {
          await dispatch(editRelease(values))
            .then(unwrapResult)
            .then(() => {
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
            })
            .catch((error: any) => {
              console.log(error.response?.data.message);
            });

          await dispatch(editTypeRealease(values))
            .then(unwrapResult)
            .then(() => {
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
            })
            .catch((error: any) => {
              console.log(error.response?.data.message);
            });

          await dispatch(putRelease(values))
            .then(unwrapResult)
            .then(() => {
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
            })
            .catch((error: any) => {
              console.log(error.response?.data.message);
            });

          await dispatch(editValueRealease(values))
            .then(unwrapResult)
            .then(() => {
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
            })
            .catch((error: any) => {
              console.log(error.response?.data.message);
            });
          console.log('deu bom', values);
          formik.resetForm();
        }
        handleCloseEdit();
      } catch (error) {
        console.log(error);
      }
    },
  });

  React.useEffect(() => {
    console.log(id);
  }, [id]);

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
          open={openModalEdit}
        >
          <form onSubmit={formik.handleSubmit}>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleCloseEdit}
            >
              <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Helvetica',
                }}
              >
                Editar
              </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Box key={id}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                  >
                    <Box sx={{ display: 'flex' }}>
                      <FormControlLabel
                        value={(formik.values.type = 'despesa').toString()}
                        onChange={formik.handleChange}
                        control={<Radio />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: 'primary.dark' }}
                          >
                            Despesa
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value={(formik.values.type = 'receita').toString()}
                        onChange={formik.handleChange}
                        control={<Radio />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: 'primary.dark' }}
                          >
                            Receita
                          </Typography>
                        }
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
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
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '8px',
                    }}
                  >
                    <TextField
                      sx={{
                        width: '100%',
                        height: '4vh',
                        borderRadius: '3px',
                      }}
                      id="description"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                  </Box>
                </Box>
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
                          onChange={formik.handleChange}
                          value={formik.values.value}
                          InputProps={{
                            inputComponent: NumberFormatCustom as any,
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyTwoTone
                                  sx={{ fontSize: '17px', marginLeft: '-8px' }}
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
                          name="pago"
                          id="pago"
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

                {/* Box Active */}
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

                        <TextField
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

                        <TextField
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

                        <TextField
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
                {/* Box Active */}

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
              </Box>
            </DialogContent>
          </form>
        </BootstrapDialog>
      </Box>
    </div>
  );
}
