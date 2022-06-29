import { ThumbUp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { getDailyListing, putRelease } from 'redux/reducers/releasesReducer';

interface IPropsButtonTrue {
  id: number;
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
}

export default function ButtonTrue({
  id,
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsButtonTrue) {
  const dispatch = useAppDispatch();
  const [stateButton, setStateButton] = React.useState(true);

  const formik = useFormik({
    initialValues: {
      id,
      paidOut: false,
      payDay: new Date(dayjs().format('yyyy/mm/dd').toString()),
    },

    onSubmit: async values => {
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
  const toggle = () => {
    formik.setValues(prevState => {
      return { ...prevState, paidOut: false };
    });
    setStateButton(!stateButton);
  };
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <IconButton
            type="submit"
            onClick={toggle}
            aria-label="delete"
            name="pago"
            id="pago"
          >
            <ThumbUp sx={{ color: '#39AB91', fontSize: '20px' }} />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
}
