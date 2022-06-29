import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LogoControlle from 'assets/controlle.svg';
import { useAuth } from 'context/AuthProvider/useAuth';

export default function BoxLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(4, 'Sua senha deve ter no minímo 4 caracteres')
        .max(50, 'Sua senha deve ter no máximo 50 caracteres')
        .required('Digite uma senha válida'),
      email: Yup.string()
        .email('exemp: evocorp@gmail.com')
        .required('Digite um email válido'),
    }),
    onSubmit: async values => {
      try {
        await auth.authenticate(values.email, values.password);

        navigate('/');
      } catch (error: any) {
        formik.setErrors({ submit: error.response?.data.message });
      }
    },
  });

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <img src={LogoControlle} alt="" />
        <Typography
          variant="h5"
          sx={{
            color: '#1a2859',
            fontWeight: 'bold',
            padding: '40px',
          }}
        >
          Acesse sua conta
        </Typography>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
          <Typography sx={{ color: '#5b708a', padding: '8px' }}>
            Email
          </Typography>
          <OutlinedInput
            sx={{
              width: '400px',
              height: '56px',
              padding: '8px 18px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '3px',
            }}
            placeholder="Email"
            color="info"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FormHelperText error>{formik.errors.email}</FormHelperText>
        </Box>
        <Box sx={{ padding: '16px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: '#5b708a', padding: '8px' }}>
              Senha
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'secondary.main' }}
              to="/"
            >
              <Typography variant="body2">Esqueceu sua senha?</Typography>
            </Link>
          </Box>
          <OutlinedInput
            sx={{
              width: '400px',
              height: '56px',
              padding: '8px 18px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '3px',
            }}
            placeholder="Senha"
            color="info"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>{formik.errors.password}</FormHelperText>
        </Box>
        <Box sx={{ padding: '16px' }}>
          <Button
            type="submit"
            sx={{
              width: '400px',
              bgcolor: 'secondary.main',
              padding: '8px 18px',
            }}
            variant="contained"
          >
            <Typography sx={{ color: '#fff' }}>Login</Typography>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', padding: '16px' }}>
          <Typography>Não tem conta?</Typography>
          <Link
            style={{ textDecoration: 'none', color: 'secondary.main' }}
            to="/"
          >
            <Typography sx={{ marginLeft: '8px' }}>
              Teste Grátis por 7 dias.
            </Typography>
          </Link>
        </Box>
      </Box>
    </form>
  );
}
