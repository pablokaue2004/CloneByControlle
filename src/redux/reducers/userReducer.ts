import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from 'server/api';

interface LogedUser {
  id: number;
  email: string;
  imageUrl: string;
  name: string;
  openingBalance: number;
}

type AccountState = {
  user: LogedUser;
};

export const getUser = createAsyncThunk('User/getUser', async () => {
  const response = await api.get(`/users/userauth`);
  return response.data as LogedUser;
});

const initialState = {
  user: {
    id: 0,
    email: '',
    imagemUrl: '',
    nome: '',
  },
} as unknown as AccountState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
