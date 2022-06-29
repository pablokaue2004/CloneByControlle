import React from 'react';
import {
  ArrowDropDownTwoTone,
  Circle,
  Delete,
  Edit,
  Error,
  Label,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';

import { useAppSelector } from 'redux/hooks/useAppSelector';

import { useAuth } from 'context/AuthProvider/useAuth';
import ButtonFalse from './ButtonListPaidOutFalse';
import ButtonTrue from './ButtonListPaidOutTrue';
import Details from './DetailsRelease';
import ButtonEditarList from './EditRelease';
import ButtonDeleteList from './ButtonDeleteRelease';
import PopoverFixedListRealease from './PopoverFixedListRealease';

interface IPropsList {
  type: any;
  totalValue: any;
  categoryFilter: any;
  accountFilter: any;
  searchFilter: any;
}

export default function Listagemlancamentoss({
  type,
  totalValue,
  categoryFilter,
  accountFilter,
  searchFilter,
}: IPropsList) {
  const { listagemdiaria } = useAppSelector(state => state.releases);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectId, setSelectId] = React.useState<number | null>(null);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const auth = useAuth();

  const handleClickOpenModalEdit = (id: number | null) => {
    setOpenModalEdit(true);
    setSelectId(id);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleClickOpen = (id: number | null) => {
    setOpenDelete(true);
    setSelectId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (id: number) => {
    setOpenModal(true);
    setSelectId(id);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {listagemdiaria?.releases?.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '30vh',
          }}
        >
          <Error sx={{ fontSize: '50px', color: '#CAD0D1' }} />
          <Typography
            variant="body1"
            sx={{
              color: 'primary.light',
              fontWeight: 'bold',
            }}
          >
            Nenhuma movimentação no período.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {listagemdiaria?.releases?.map(list => (
            <Box
              sx={{
                // bgcolor: selected ? '#46ffff' : 'transparent',
                width: '800px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                overflow: 'hidden',
                height: '100%',
                borderBottom: '1px solid #eef1f5',
              }}
              key={list.id}
            >
              <Box
                onClick={() => handleRowClick(list.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'center',
                      color: 'primary.dark',
                      padding: 4,
                      height: 68,
                      width: 350,
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
                  <Circle
                    sx={{
                      color: list.type === 'receita' ? '#02bea2' : '#f35b5b',
                      fontSize: '12px',
                    }}
                  />

                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      fontWeight: 'bold',
                      marginLeft: 2,
                    }}
                  >
                    {list.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {list.fixed === true ? <PopoverFixedListRealease /> : null}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.dark',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {list.category?.name === 'Pensão' && (
                      <Label sx={{ color: '#AE855A' }} />
                    )}
                    {list.category?.name === 'Outros' && (
                      <Label sx={{ color: '#4C5661' }} />
                    )}
                    {list.category?.name === 'Aluguel' && (
                      <Label sx={{ color: '#CB62D2' }} />
                    )}
                    {list.category?.name === 'Fatura' && (
                      <Label sx={{ color: '#DA304F' }} />
                    )}
                    {list.category?.name === 'Energia' && (
                      <Label sx={{ color: '#454555' }} />
                    )}
                    {list.category?.name === 'Agua' && (
                      <Label sx={{ color: '#3D6DE5' }} />
                    )}
                    {list.category?.name === 'Aposento' && (
                      <Label sx={{ color: '#DDEEED' }} />
                    )}
                    {list.category?.name === 'Lazer' && (
                      <Label sx={{ color: '#6CFACD' }} />
                    )}

                    {list.category?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      width: '260px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: '#31304c',
                      }}
                    >
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(Number(list.value))}
                    </Typography>

                    <Typography
                      sx={{ fontSize: '11px', color: 'primary.light' }}
                    >
                      em {list.account?.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Box sx={{ marginTop: '-16px' }}>
                  {list.paidOut === true ? (
                    <ButtonTrue
                      searchFilter={searchFilter}
                      accountFilter={accountFilter}
                      categoryFilter={categoryFilter}
                      totalValue={totalValue}
                      type={type}
                      id={list.id}
                    />
                  ) : (
                    <ButtonFalse
                      searchFilter={searchFilter}
                      accountFilter={accountFilter}
                      categoryFilter={categoryFilter}
                      totalValue={totalValue}
                      type={type}
                      id={list.id}
                    />
                  )}
                </Box>
                <Box sx={{ marginTop: '-16px' }}>
                  <Tooltip title="">
                    <IconButton
                      onClick={event => handleClick(event, list.id)}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <ArrowDropDownTwoTone />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '200px',
                      marginLeft: '80px',
                      overflow: 'visible',
                      bgcolor: 'background.paper',
                      filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.1))',
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
                  <MenuItem sx={{ width: '200px' }}>
                    <Box
                      onClick={() => handleClickOpenModalEdit(selectId)}
                      sx={{ display: 'flex', width: '200px' }}
                    >
                      <ListItemIcon>
                        <Edit sx={{ color: 'primary.main' }} fontSize="small" />
                      </ListItemIcon>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.main' }}
                      >
                        Editar
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem sx={{ width: '200px' }}>
                    <Box
                      sx={{ display: 'flex', width: '200px' }}
                      onClick={() => handleClickOpen(selectId)}
                    >
                      <ListItemIcon>
                        <Delete color="error" fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ color: 'red' }}>
                        Excluir
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Box>
        <ButtonEditarList
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          type={type}
          handleCloseEdit={handleCloseModalEdit}
          openModalEdit={openModalEdit}
          id={selectId}
        />
        <ButtonDeleteList
          handleClose={handleCloseDelete}
          open={openDelete}
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          type={type}
          id={selectId}
        />
        <Details
          id={selectId}
          openModal={openModal}
          setOpenModal={() => setOpenModal(false)}
        />
      </Box>
    </Grid>
  );
}
