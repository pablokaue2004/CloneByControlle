/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowBackIosTwoTone, ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import React, { ChangeEvent, useEffect, useState } from 'react';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';

import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { getDailyListing } from 'redux/reducers/releasesReducer';

interface IPropsPaginacao {
  type: any;
  setTotalValue: any;
  changeValue: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
}

export default function PaginacaoDia({
  type,
  setTotalValue,
  totalValue,
  changeValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsPaginacao) {
  const [date, setDate] = useState(dayjs(new Date()));
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setDate(dayjs(date).add(1, totalValue));
    dispatch(
      getDailyListing({
        search: searchFilter,
        account: accountFilter,
        category: categoryFilter,
        dayValue: totalValue,
        type,
        date: dayjs(date).add(1, totalValue).format('YYYY-MM-DD').toString(),
      }),
    );
  };

  const handleBack = () => {
    setDate(dayjs(date).subtract(1, totalValue));
    dispatch(
      getDailyListing({
        search: searchFilter,
        account: accountFilter,
        category: categoryFilter,
        dayValue: totalValue,
        type,
        date: dayjs(date)
          .subtract(1, totalValue)
          .format('YYYY-MM-DD')
          .toString(),
      }),
    );
  };

  useEffect(() => {
    console.log(date);
  });
  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} aria-label="ArrowLeft">
            <ArrowBackIosTwoTone sx={{ fontSize: '18px' }} />
          </IconButton>

          <PopupState variant="popover" popupId="demoPopover">
            {popupState => (
              <div>
                <Box
                  {...bindHover(popupState)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: 'pointer',
                      fontFamily: 'Arial',
                      color: 'primary.dark',
                      fontWeight: 500,
                      padding: '0 10px',
                    }}
                  >
                    {totalValue === changeValue.dia &&
                      dayjs(date).locale('pt-br').format('DD [de] MMMM/YYYY')}
                    {totalValue === changeValue.mes &&
                      dayjs(date).locale('pt-br').format('MMMM [de] YYYY')}
                    {totalValue === changeValue.semana &&
                      `${dayjs(date)
                        .locale('pt-br')
                        .format('DD MMMM')} a ${dayjs(date)
                        .locale('pt-br')
                        .add(7, 'day')
                        .format('DD MMMM')}`}
                  </Typography>
                  <HoverPopover
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 32,
                          right: 14,
                          width: 100,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: -1,
                        },
                        bgcolor: 'background.paper',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.32))',
                        mt: 1.5,
                      },
                    }}
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Button
                          value={changeValue?.dia}
                          onClick={() => setTotalValue(changeValue?.dia)}
                          // variant="body2"
                          sx={[
                            {
                              width: '200px',
                              color: 'primary.light',
                              padding: '3px',
                              cursor: 'pointer',
                            },
                            () => ({
                              '&:hover': {
                                color: 'primary.dark',
                                transition: 'all 0.3s',
                              },
                            }),
                          ]}
                        >
                          <Typography variant="body2">Hoje</Typography>
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          value={changeValue?.semana}
                          onClick={() => setTotalValue(changeValue?.semana)}
                          // variant="body2"
                          sx={[
                            {
                              width: '200px',
                              color: 'primary.light',
                              padding: '3px',
                              cursor: 'pointer',
                            },
                            () => ({
                              '&:hover': {
                                color: 'primary.dark',
                                transition: 'all 0.3s',
                              },
                            }),
                          ]}
                        >
                          <Typography variant="body2">Esta semana</Typography>
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          value={changeValue?.mes}
                          onClick={() => setTotalValue(changeValue?.mes)}
                          // variant="body2"
                          sx={[
                            {
                              width: '200px',
                              color: 'primary.light',
                              padding: '3px',
                              cursor: 'pointer',
                            },
                            () => ({
                              '&:hover': {
                                color: 'primary.dark',
                                transition: 'all 0.3s',
                              },
                            }),
                          ]}
                        >
                          <Typography variant="body2">Este mês</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </HoverPopover>
                </Box>
              </div>
            )}
          </PopupState>

          <IconButton onClick={handleNext} aria-label="ArrowLeft">
            <ArrowForwardIos sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
