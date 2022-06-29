import {
  ArrowDropDownTwoTone,
  Close,
  FilterListTwoTone,
} from '@mui/icons-material';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';
import { getAccountFilter } from 'redux/reducers/accountReducer';
import { getCategoryFilter } from 'redux/reducers/releasesReducer';
import InputSerach from './InputSearch';

interface IPropsFilter {
  changeValueType: any;
  setType: any;
  handleConta: (value: number) => void;
  handleCategory: (value: string) => void;
  handleSearch: (value: string) => void;
}

export default function Filtrar({
  changeValueType,
  setType,
  handleConta,
  handleCategory,
  handleSearch,
}: IPropsFilter) {
  const { categoriesToFilter } = useAppSelector(state => state.releases);
  const { accountsToFilter } = useAppSelector(state => state.account);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAccountFilter());
    dispatch(getCategoryFilter());
  }, [dispatch]);
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  const ListFilterType = [
    {
      label: 'Todos os lançamentos',
      value: changeValueType?.todososlancamentos,
    },
    {
      label: 'Receitas',
      value: changeValueType?.receita,
    },
    {
      label: 'Receitas recebidas',
      value: changeValueType?.receitarecebida,
    },
    {
      label: 'Receitas não recebidas',
      value: changeValueType?.receitanaorecebida,
    },
    {
      label: 'Despesas',
      value: changeValueType?.despesa,
    },
    {
      label: 'Despesas pagas',
      value: changeValueType?.despesapaga,
    },
    {
      label: 'Despesas não pagas',
      value: changeValueType?.despesanaopaga,
    },
  ];

  return (
    <Box>
      {active ? (
        <Box
          sx={{
            height: '56px',
            bgcolor: 'secondary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={toggle} aria-label="ArrowLeft">
              <Close sx={{ color: 'background.paper' }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '8px',
                }}
              >
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
                          variant="body2"
                          sx={{ color: 'background.paper' }}
                        >
                          Tipo
                        </Typography>

                        <ArrowDropDownTwoTone
                          sx={{ fontSize: '20px', color: 'background.paper' }}
                        />
                        <HoverPopover
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              bgcolor: 'background.paper',
                              overflow: 'visible',
                              filter:
                                'drop-shadow(0px 2px 3px rgba(0,0,0,0.32))',
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
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '8px',
                            }}
                          >
                            {ListFilterType.map(filter => (
                              <Button
                                key={filter.value}
                                value={filter.value}
                                onClick={() => setType(filter.value)}
                                sx={[
                                  {
                                    width: '200px',
                                    color: 'primary.dark',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  },
                                  () => ({
                                    '&:hover': {
                                      bgcolor: 'background.paper',
                                      color: 'primary.main',
                                      transition: 'all 0.3s',
                                    },
                                  }),
                                ]}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ padding: '8px' }}
                                >
                                  {filter.label}
                                </Typography>
                              </Button>
                            ))}
                          </Box>
                        </HoverPopover>
                      </Box>
                    </div>
                  )}
                </PopupState>
              </Box>
              {/* */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '16px',
                }}
              >
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
                          variant="body2"
                          sx={{ color: 'background.paper' }}
                        >
                          Contas
                        </Typography>
                        <ArrowDropDownTwoTone
                          sx={{ fontSize: '20px', color: 'background.paper' }}
                        />
                        <HoverPopover
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              bgcolor: 'background.paper',
                              overflow: 'visible',
                              filter:
                                'drop-shadow(0px 2px 3px rgba(0,0,0,0.32))',
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
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '8px',
                            }}
                          >
                            {accountsToFilter?.map(conta => (
                              <Button
                                key={conta.name}
                                value={conta.id}
                                onClick={() => handleConta(conta.id)}
                                sx={[
                                  {
                                    width: '200px',
                                    color: 'primary.dark',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  },
                                  () => ({
                                    '&:hover': {
                                      bgcolor: 'background.paper',
                                      color: 'primary.main',
                                      transition: 'all 0.3s',
                                    },
                                  }),
                                ]}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ padding: '8px' }}
                                >
                                  {conta.name}
                                </Typography>
                              </Button>
                            ))}
                          </Box>
                        </HoverPopover>
                      </Box>
                    </div>
                  )}
                </PopupState>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '16px',
                }}
              >
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
                          variant="body2"
                          sx={{ color: 'background.paper' }}
                        >
                          Categorias
                        </Typography>
                        <ArrowDropDownTwoTone
                          sx={{ fontSize: '20px', color: 'background.paper' }}
                        />
                        <HoverPopover
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              bgcolor: 'background.dark',
                              overflow: 'visible',
                              filter:
                                'drop-shadow(0px 2px 3px rgba(0,0,0,0.32))',
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
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '8px',
                            }}
                          >
                            {categoriesToFilter?.map(categoria => (
                              <Button
                                onClick={() => handleCategory(categoria.name)}
                                key={categoria.name}
                                value={categoria.name}
                                sx={[
                                  {
                                    width: '200px',
                                    color: 'primary.dark',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  },
                                  () => ({
                                    '&:hover': {
                                      bgcolor: 'background.paper',
                                      color: 'primary.main',
                                      transition: 'all 0.3s',
                                    },
                                  }),
                                ]}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ padding: '8px' }}
                                >
                                  {categoria.name}
                                </Typography>
                              </Button>
                            ))}
                          </Box>
                        </HoverPopover>
                      </Box>
                    </div>
                  )}
                </PopupState>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <InputSerach searchFilter={handleSearch} />
        </Box>
      ) : (
        <Box
          sx={{
            height: '56px',
            bgcolor: 'secondary.dark',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={toggle} aria-label="ArrowLeft">
              <FilterListTwoTone sx={{ color: 'primary.light' }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: 'primary.light', fontWeight: 'bold' }}
            >
              Filtrar por...
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <InputSerach searchFilter={handleSearch} />
        </Box>
      )}
    </Box>
  );
}
