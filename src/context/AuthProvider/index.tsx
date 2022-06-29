import React, { createContext, useEffect, useState } from 'react';
import { api } from 'server/api';
import { IAuthProvider, IContext, IAuthUser } from './types';
import { getUserLocalStorage, Register, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IAuthUser | null>(null);

  useEffect(() => {
    const storagedUser = getUserLocalStorage();

    if (storagedUser) {
      setUser(storagedUser);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const request = await api.post('auth', { email, password });

    const payload = {
      user: request.data?.user,
      access_token: request.data?.access_token,
    };

    if (payload) {
      setUser(payload.user);
      setUserLocalStorage(payload);
    }
  }

  async function register(
    username: string,
    email: string,
    password: string,
    confirmpass: string,
  ) {
    const response = await Register(username, email, password, confirmpass);

    const payload = {
      email: response.email,
      username,
      password,
      confirmpass,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  const memoizedValue = React.useMemo(
    () => ({ user, authenticate, register, logout }),
    [user],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
