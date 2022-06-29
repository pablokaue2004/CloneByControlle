import { ThumbDownAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Menu,
  OutlinedInput,
  Tooltip,
  Typography,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
// import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { getDailyListing, putRelease } from 'redux/reducers/releasesReducer';

interface IPropsButtonFalse {
  id: number;
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
}

export default function ButtonFalse({
  id,
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsButtonFalse) {
  const dispatch = useAppDispatch();
  const [anchorElFalse, setAnchorElFalse] = React.useState<null | HTMLElement>(
    null,
  );
  const openFalse = Boolean(anchorElFalse);

  const handleCloseFalse = () => {
    setAnchorElFalse(null);
  };
  const formik = useFormik({
    initialValues: {
      id,
      paidOut: false,
      payDay: new Date(),
    },

    onSubmit: values => {
      try {
        if (id) {
          dispatch(putRelease(values))
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
        }

        formik.resetForm();
      } catch (error) {
        console.log('deu erro');
        console.log(error);
      }
    },
  });
  const handleClickFalse = (event: React.MouseEvent<HTMLElement>) => {
    formik.setValues(prevState => {
      return { ...prevState, paidOut: true };
    });
    setAnchorElFalse(event.currentTarget);
  };
  return (
    <Box>
      <Box>
        <Tooltip title="">
          <IconButton onClick={handleClickFalse} aria-label="delete">
            <ThumbDownAlt sx={{ fontSize: '20px' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorElFalse}
        id="account-menu"
        open={openFalse}
        onClose={handleCloseFalse}
        PaperProps={{
          elevation: 0,
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            width: '200px',
            marginLeft: '80px',
            overflow: 'visible',
            bgcolor: 'background.paper',
            filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.3))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 33,
              right: 14,
              width: 103,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{ color: 'primary.light', padding: '8px' }}
            >
              Data de pagamento
            </Typography>
            <OutlinedInput
              name="payDay"
              id="payDay"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.payDay}
              sx={{ width: '190px', height: '45px' }}
            />

            <Button
              type="submit"
              sx={{ bgcolor: '#01ab92', marginTop: '16px' }}
              variant="contained"
            >
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Marcar como pago
              </Typography>
            </Button>
          </Box>
        </form>
      </Menu>
    </Box>
  );
}
