import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { unwrapResult } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import {
  deleteRealease,
  getDailyListing,
} from 'redux/reducers/releasesReducer';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPropsButtonDelete {
  id: number | null;
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
  handleClose: () => void;

  open: any;
}

export default function ButtonDeleteList({
  id,
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
  handleClose,

  open,
}: IPropsButtonDelete) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      id,
    },

    onSubmit: async () => {
      try {
        if (id) {
          await dispatch(deleteRealease(id))
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

        handleClose;
        formik.resetForm();
      } catch (error) {
        console.log('deu erro');
        console.log(error);
      }
    },
  });
  return (
    <Box sx={{ display: 'flex' }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              padding: '64px 50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: 'primary.dark' }}
              align="center"
            >
              Você tem certeza que deseja excluir o <br />
              lançamento Outros?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Button
                type="submit"
                onClick={handleClose}
                sx={[
                  {
                    width: '258px',
                    bgcolor: '#f35b5b',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: '16px',
                  },
                  () => ({
                    '&:hover': {
                      bgcolor: '#f35b5b',
                    },
                  }),
                ]}
              >
                Sim
              </Button>
              <Button
                onClick={handleClose}
                sx={[
                  {
                    width: '258px',
                    bgcolor: 'primary.light',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: '16px',
                  },
                  () => ({
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }),
                ]}
              >
                Não
              </Button>
            </Box>
          </DialogContent>
        </form>
      </Dialog>
    </Box>
  );
}
