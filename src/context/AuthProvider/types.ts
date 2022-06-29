import React from 'react';

export interface IToken {
  access_token?: string;
}

export interface IAuthUser {
  email?: string;
  access_token?: string;
  username?: string;
  password?: string;
  confirmpassword?: string;
  imageUrl?: string;
  name?: string;
}

export interface IContext {
  user: IAuthUser | null;
  register: (
    username: string,
    email: string,
    password: string,
    confirmpass: string,
  ) => Promise<void>;
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: React.ReactNode;
}
