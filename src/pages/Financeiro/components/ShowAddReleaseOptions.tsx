import { Add, Remove, RepeatTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  MenuItem,
  FormHelperText,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Select from '@mui/material/Select';

// import { FormikProps } from 'formik';
// import { IConfigFormik } from './ExpenseModal';

interface IPropsHandleSubmit {
  formik: any;
  // formik: FormikProps<IConfigFormik>;
}

export default function AddOptions({ formik }: IPropsHandleSubmit) {
  const skeletonNumbers: number[] = [];
  for (let i = 1; i < 100; i += 1) {
    skeletonNumbers.push(i);
  }
  const [stateButtonOptions, setStateButtonOptions] = useState(false);
  const [stateButtonRepeat, setStateButtonRepeat] = useState(false);
  const [value, setValue] = React.useState('fixo');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (value !== 'fixo') {
      formik.setFieldValue('fixed', true);
      formik.setFieldValue('installments', false);
    } else {
      formik.setFieldValue('installments', true);
      formik.setFieldValue('fixed', false);
    }
  };

  useEffect(() => {
    // console.log('value', value);
    // console.log('fixed', formik.values.fixed);
    // console.log('installments', formik.values.installments);
  }, [formik, value]);

  const toggleOptions = () => {
    setStateButtonOptions(!stateButtonOptions);
  };

  const toggleRepeat = () => {
    setStateButtonRepeat(!stateButtonRepeat);
  };

  return (
    <Box>
      {stateButtonRepeat ? (
        <>
          <Divider sx={{ flex: 1, marginTop: '16px' }} />

          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginLeft: '-16px',
                marginRight: '-16px',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '16px',
                }}
              >
                <Typography variant="body2" sx={{ color: 'primary.light' }}>
                  Repetir
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={handleChange}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormControlLabel
                        // onChange={handleFixed}
                        value="fixo"
                        control={<Radio />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: 'primary.dark' }}
                          >
                            é uma despesa fixa
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="parcelado"
                        // onChange={handleInstallments}
                        control={<Radio />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: 'primary.dark' }}
                          >
                            é um lançamento parcelado em
                          </Typography>
                        }
                      />
                    </Box>
                  </RadioGroup>
                  {value === 'fixo' ? (
                    <Box>
                      <FormControl fullWidth>
                        <Select
                          id="timecourse"
                          name="timecourse"
                          value={formik.values.timecourse}
                          onChange={formik.handleChange}
                          sx={{ width: '97%' }}
                        >
                          <MenuItem key="year" value="year">
                            Anual
                          </MenuItem>
                          <MenuItem value="semestre">Semestral</MenuItem>
                          <MenuItem value="trimestral">Trimestral</MenuItem>
                          <MenuItem value="bimestral">Bimestral</MenuItem>
                          <MenuItem key="month" value="month">
                            Meses
                          </MenuItem>
                          <MenuItem value="quinzenas">Quinzenas</MenuItem>
                          <MenuItem key="week" value="week">
                            Semanas
                          </MenuItem>
                          <MenuItem key="day" value="day">
                            Dias
                          </MenuItem>
                        </Select>
                        <FormHelperText>
                          Se não selecionar nenhuma categoria, Meses irá como
                          como padrão
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <FormControl fullWidth>
                        <Select
                          id="installment"
                          name="installment"
                          value={formik.values.installment}
                          onChange={formik.handleChange}
                          sx={{ width: '90%' }}
                        >
                          {skeletonNumbers.map(item => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <Select
                          id="timecourse"
                          name="timecourse"
                          value={formik.values.timecourse}
                          onChange={formik.handleChange}
                          sx={{ width: '90%' }}
                        >
                          <MenuItem key="year" value="year">
                            Anos
                          </MenuItem>
                          <MenuItem value="semestre">Semestres</MenuItem>
                          <MenuItem value="trimestres">Trimestres</MenuItem>
                          <MenuItem value="bimestres">Bimestres</MenuItem>
                          <MenuItem key="month" value="month">
                            Mensal
                          </MenuItem>
                          <MenuItem value="quinzenais">Quinzenais</MenuItem>
                          <MenuItem key="week" value="week">
                            Semanal
                          </MenuItem>
                          <MenuItem key="day" value="day">
                            Diárias
                          </MenuItem>
                        </Select>
                        <FormHelperText>
                          Se não selecionar nenhuma categoria, Mensal irá como
                          como padrão
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  )}
                </FormControl>
              </Box>
            </Box>
          </form>
        </>
      ) : null}

      <Box
        sx={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Divider sx={{ flex: 1 }} />
        {stateButtonOptions === false ? (
          <Button
            onClick={toggleOptions}
            sx={{ border: '1px solid primary.light', borderRadius: '20px' }}
          >
            <Add sx={{ color: 'primary.light', fontSize: '17px' }} />
            <Typography variant="body2" sx={{ color: 'primary.light' }}>
              Mostrar opções
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={toggleOptions}
            sx={{ border: '1px solid primary.light', borderRadius: '20px' }}
          >
            <Remove sx={{ color: 'primary.light', fontSize: '17px' }} />
            <Typography variant="body2" sx={{ color: 'primary.light' }}>
              Esconder opções
            </Typography>
          </Button>
        )}
        <Divider sx={{ flex: 1 }} />
      </Box>

      {stateButtonOptions ? (
        <Box
          sx={{
            height: '2vh',
            marginLeft: '-16px',
            marginRight: '-16px',
            padding: '16px',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {stateButtonRepeat === false ? (
              <Button onClick={toggleRepeat}>
                <RepeatTwoTone sx={{ color: 'primary.main' }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'primary.main', marginLeft: '8px' }}
                >
                  Repetir
                </Typography>
              </Button>
            ) : (
              <Button onClick={toggleRepeat}>
                <RepeatTwoTone sx={{ color: 'primary.light' }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'primary.light', marginLeft: '8px' }}
                >
                  Repetir
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
