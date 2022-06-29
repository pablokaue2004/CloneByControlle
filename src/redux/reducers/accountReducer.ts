import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'server/api';

interface IBank {
  name: string;
}
export interface IAccount {
  id: number;
  name: string;
  bank: IBank;
  openingBalance: number;
}

type AccountState = {
  accounts: IAccount[];
  accountsToFilter: IAccount[];
};

export const getAccounts = createAsyncThunk('User/getAccounts', async () => {
  const response = await api.get(`/accounts`);
  return response.data.accounts as IAccount[];
});

export const getAccountFilter = createAsyncThunk(
  'User/getAccountFilter',
  async () => {
    const response = await api.get(`/accounts/to-filter`);
    return response.data.accountsToFilter as IAccount[];
  },
);

const initialState = {
  user: {
    id: 0,
    email: '',
    imagemUrl: '',
    nome: '',
  },
  details: {
    id: 0,
    descricao: '',
    valor: 0,
    emissao: '',
    vencimento: '',
    idConta: 0,
    tipo: 0,
    pago: '',
    idCategoria: 0,
    dataPagamento: '',
    releaseAt: '',
  },
  lancamento: {
    id: 0,
    descricao: '',
    valor: 0,
    emissao: '',
    vencimento: '',
    idConta: 0,
    tipo: 0,
    pago: '',
    idCategoria: 0,
    dataPagamento: '',
  },
  conta: {
    name: '',
    id: 0,
    openingBalance: 0,
    bank: {
      name: '',
    },
  },
  categoria: {
    id: 0,
    nome: '',
  },
  listagem: {
    id: 0,
    descricao: '',
    valor: 0,
    pago: false,
    conta: 0,
    categoria: 0,
  },
  activeItemList: {},

  // categoriaData: {
  //   value,
  // },
} as unknown as AccountState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
    builder.addCase(getAccountFilter.fulfilled, (state, action) => {
      state.accountsToFilter = action.payload;
    });
  },
});

export default accountSlice.reducer;
