import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import React from 'react';

import { useAppSelector } from 'redux/hooks/useAppSelector';

export default function More() {
  const [stateButtonMore, setStateButtonMore] = React.useState(false);
  const { listagemdiaria } = useAppSelector(state => state.releases);

  const toggleMore = () => {
    setStateButtonMore(!stateButtonMore);
  };

  return (
    <Box>
      {stateButtonMore ? (
        <Box
          sx={{
            width: '840px',
            height: '238px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              height: '238px',
              display: 'flex',
              marginBlockEnd: '-80px',
              padding: '16px',
            }}
          >
            <Typography variant="body2" color="secondary">
              Entenda seu Saldo
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              sx={{
                marginLeft: '16px',
              }}
            >
              Fluxo de Caixa
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '210px',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ marginLeft: '175px', display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '255px',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                    }}
                  >
                    Receita realizada
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                    }}
                  >
                    Receita prevista
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                    }}
                  >
                    Despesa realizada
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                    }}
                  >
                    Despesa prevista
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#02bea2' }}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(listagemdiaria?.balance.realizedRecipe)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.light' }}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(listagemdiaria?.prevision.expectedRecipe)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#f35b5b' }}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(listagemdiaria?.balance.realizedExpense)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.light' }}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(listagemdiaria?.prevision.expectedExpense)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    padding: '16px',
                    marginLeft: '200px',
                  }}
                >
                  <Typography sx={{ color: 'primary.light' }}>saldo</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                    }}
                  >
                    previsão
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    padding: '16px',
                    marginLeft: '170px',
                  }}
                >
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {listagemdiaria?.balance.totalBalance}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'primary.light',
                      fontWeight: 'bold',
                    }}
                  >
                    {listagemdiaria?.prevision.totalExpected}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <IconButton onClick={toggleMore} aria-label="delete">
            <Remove />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            width: '840px',
            height: '76px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
            <Typography variant="body2" color="secondary">
              Entenda seu Saldo
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              sx={{
                margin: '8px',
              }}
            >
              Fluxo de Caixa
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              padding: '16px',
            }}
          >
            <Typography sx={{ color: 'primary.light' }}>saldo</Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.light',
              }}
            >
              previsão
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  padding: '16px',
                }}
              >
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {listagemdiaria?.balance?.totalBalance}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.light',
                    fontWeight: 'bold',
                  }}
                >
                  {listagemdiaria?.prevision?.totalExpected}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={toggleMore} aria-label="delete">
              <Add />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
