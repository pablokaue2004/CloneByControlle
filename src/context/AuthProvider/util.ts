import { api } from 'server/api';
import { IAuthUser } from './types';

export function setUserLocalStorage(user: IAuthUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  const request = await api.post('auth', { email, password });

  return request.data;
}

export async function Register(
  username: string,
  email: string,
  password: string,
  confirmpass: string,
) {
  try {
    const request = await api.post('user', {
      username,
      email,
      password,
      confirmpass,
    });

    return request.data;
  } catch (error) {
    return error;
  }
}
