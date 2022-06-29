import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from 'server/api';
import { IAccount } from './accountReducer';

export interface ICategoryToAddRelease {
  id: number;
  name: string;
}

interface IPrevisionBalanceRelease {
  totalExpected: number;
  expectedExpense: number;
  expectedRecipe: number;
}

interface IBalance {
  totalBalance: number;
  realizedExpense: number;
  realizedRecipe: number;
}

export interface IRealease {
  account: IAccount;
  fixed: boolean;
  category: ICategoryToAddRelease;
  description: string;
  id: number;
  value: number;
  emission: Date;
  dueDate: Date;
  accountId: number;
  type: string;
  paidOut: boolean;
  categoryId: number;
  payDay: Date;
  releaseAt: string;
}

interface IDailyList {
  releases: IRealease[];
  prevision: IPrevisionBalanceRelease;
  balance: IBalance;
}

interface IDetails {
  release: IRealease;
  account: IAccount;
  category: ICategoryToAddRelease;
}

type AccountState = {
  releases: IRealease[];
  editReleases: IDetails;
  details: IDetails;
  accounts: IAccount[];
  accountsToFilter: IAccount[];
  categories: ICategoryToAddRelease[];
  categoriesToFilter: ICategoryToAddRelease[];
  listagemdiaria: IDailyList;
  activeItemList: { [key: string]: boolean };
};

export const getCategory = createAsyncThunk('User/getCategory', async () => {
  const response = await api.get(`/releases/categories`);
  return response.data.categories as ICategoryToAddRelease[];
});

export const getCategoryFilter = createAsyncThunk(
  'User/getCategoryFilter',
  async () => {
    const response = await api.get(`/releases/categories-to-filter`);
    return response.data.categoriesToFilter as ICategoryToAddRelease[];
  },
);

export const getDailyListing = createAsyncThunk(
  'User/getDailyListing',
  async ({
    date,
    type,
    dayValue,
    category,
    account,
    search,
  }: {
    date: string;
    type: string;
    dayValue: string;
    category: string;
    account: number;
    search: string;
    // conta: number;
  }) => {
    const response = await api.get(
      `/releases/?type=${type}&filter=${dayValue}&date=${date}&category=${category}&account=${account}&search=${search}`,
    );
    return response.data as IDailyList;
  },
);

export const createRelease = createAsyncThunk(
  'Lancamento/createRelease',
  async (
    {
      fixed,
      installments,
      installment,
      timecourse,
      description,
      value,
      emission,
      dueDate,
      accountId,
      type,
      paidOut,
      categoryId,
      payDay,
    }: {
      fixed: Boolean;
      installment: number;
      timecourse: string;
      installments: Boolean;
      description: string;
      value: number;
      emission: Date;
      dueDate: Date;
      accountId: number | undefined;
      type: string;
      paidOut: Boolean;
      categoryId: number;
      payDay: Date;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post(
        `/releases/newrelease?installment=${installment}&timecourse=${timecourse}`,
        {
          fixed,
          installments,
          description,
          value,
          emission,
          dueDate,
          accountId,
          type,
          paidOut,
          categoryId,
          payDay,
        },
      );
      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editRelease = createAsyncThunk(
  'Lancamento/editRelease',
  async (
    {
      id,
      description,
      categoryId,
      emission,
      dueDate,
      accountId,
    }: {
      id: number | null;
      description: string;
      emission: Date;
      dueDate: Date;
      accountId: number;
      categoryId: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/releases/${id}`, {
        description,
        emission,
        dueDate,
        accountId,
        categoryId,
      });

      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editValueRealease = createAsyncThunk(
  'Lancamento/editValueRealease',
  async (
    { id, value }: { id: number | null; value: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/releases/changevalue/${id}`, {
        value,
      });

      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editTypeRealease = createAsyncThunk(
  'Lancamento/editTypeRealease',
  async (
    { id, type }: { id: number | null; type: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/releases/changetype/${id}`, {
        type,
      });

      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const putRelease = createAsyncThunk(
  'Lancamento/editRealease',
  async (
    {
      id,
      paidOut,
      payDay,
    }: {
      id: number | null;
      paidOut: Boolean;
      payDay: Date;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/releases/pay/${id}`, {
        paidOut,
        payDay,
      });

      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getDetails = createAsyncThunk(
  'Lancamento/getDetails',
  async (id: number) => {
    const response = await api.get(`/releases/details/${id}`);

    return response.data as IDetails;
  },
);

export const deleteRealease = createAsyncThunk(
  'Lancamento/deleteRealease',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/releases/${id}`);

      return response.data as IRealease;
    } catch (error: any) {
      return rejectWithValue(error);
    }
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

export const ReleaseSlice = createSlice({
  name: 'release',
  initialState,
  reducers: {
    activeItemList(state, action) {
      state.activeItemList[action.payload];
    },
    disabledItemList(state, action) {
      delete state.activeItemList[action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategoryFilter.fulfilled, (state, action) => {
      state.categoriesToFilter = action.payload;
    });
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
    builder.addCase(getDailyListing.fulfilled, (state, action) => {
      state.listagemdiaria = action.payload;
    });
    builder.addCase(editRelease.fulfilled, (state, action) => {
      const value = state.listagemdiaria.releases.filter(
        item => item.id !== action.payload.id,
      );
      value[0].id === value[0].id;
    });

    builder.addCase(editTypeRealease.fulfilled, (state, action) => {
      const value = state.listagemdiaria.releases.filter(
        item => item.id !== action.payload.id,
      );
      value[0].id === value[0].id;
    });

    builder.addCase(editValueRealease.fulfilled, (state, action) => {
      const value = state.listagemdiaria.releases.filter(
        item => item.id !== action.payload.id,
      );
      value[0].id === value[0].id;
    });
    builder.addCase(createRelease.fulfilled, (state, action) => {
      state.listagemdiaria.releases?.unshift(action.payload);
    });

    builder.addCase(deleteRealease.fulfilled, (state, action) => {
      state.listagemdiaria.releases.filter(
        item => item.id === action.payload.id,
      );
    });
    builder.addCase(putRelease.fulfilled, (state, action) => {
      const value = state.listagemdiaria.releases.filter(
        item => item.id === action.payload.id,
      );
      value[0]?.paidOut !== value[0]?.paidOut;
    });
  },
});

export const { activeItemList, disabledItemList } = ReleaseSlice.actions;
export default ReleaseSlice.reducer;
