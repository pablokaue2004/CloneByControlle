import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { getDailyListing } from 'redux/reducers/releasesReducer';
import { useAppDispatch } from 'redux/hooks/useAppDispatch';

import { Box } from '@mui/material';
import MenuAddReceita from './components/HeaderAddRelease';
import Filtrar from './components/Filter';
import Listagemlancamentoss from './components/ListRelease';
import BalanceOptions from './components/BalanceOptions';

export default function Financeiro() {
  const dispatch = useAppDispatch();

  const changeValueType = {
    todososlancamentos: 'todos-os-lancamentos',
    receita: 'receitas',
    receitarecebida: 'receitas-recebidas',
    receitanaorecebida: 'receitas-nao-recebidas',
    despesa: 'despesas',
    despesapaga: 'despesas-pagas',
    despesanaopaga: 'despesas-nao-pagas',
  };
  const [type, setType] = useState(changeValueType.todososlancamentos);

  const changeValue = { semana: 'week', dia: 'day', mes: 'month' };
  const [totalValue, setTotalValue] = useState(changeValue.mes);

  const [accountFilter, setAccountFilter] = useState(0);
  const handleConta = (conta: number) => {
    setAccountFilter(conta);
    console.log(conta);
  };

  const [categoryFilter, setCategoryFilter] = useState('');
  const handleCategory = (category: string) => {
    setCategoryFilter(category);
    console.log(category);
  };

  const [searchFilter, setSearchFilter] = useState('');
  const handleSearch = (search: string) => {
    setSearchFilter(search);
    console.log(search);
  };

  useEffect(() => {
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
  }, [accountFilter, categoryFilter, dispatch, searchFilter, totalValue, type]);

  const [activeScroll, setActiveScroll] = useState(false);

  useEffect(() => {
    function positionScroll() {
      if (window.scrollY > 72) {
        setActiveScroll(true);
      } else {
        setActiveScroll(false);
      }
    }

    window.addEventListener('scroll', positionScroll);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '890px',
          bgcolor: 'background.paper',
          boxShadow: '0px 4px 4px primary.contrastText',
          borderRadius: '2px',
          position: 'relative',
        }}
      >
        <MenuAddReceita
          activeScroll={activeScroll}
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          changeValue={changeValue}
          setTotalValue={setTotalValue}
          type={type}
        />
        <Filtrar
          handleSearch={handleSearch}
          handleCategory={handleCategory}
          handleConta={handleConta}
          changeValueType={changeValueType}
          setType={setType}
        />

        <Listagemlancamentoss
          searchFilter={searchFilter}
          accountFilter={accountFilter}
          categoryFilter={categoryFilter}
          totalValue={totalValue}
          type={type}
        />
        <BalanceOptions />
      </Box>
    </Box>
  );
}
