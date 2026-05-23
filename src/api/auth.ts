import { wrap, ApiError } from './helpers';
import { mockUser } from '../data/mockData';
import type { User } from '../types';

export async function login(email: string, _password: string): Promise<User> {
  if (!email) throw new ApiError('Email is required', 400);
  return wrap(mockUser);
}

export async function logout(): Promise<{ success: boolean }> {
  return wrap({ success: true });
}

export async function fetchCurrentUser(): Promise<User | null> {
  return wrap(mockUser);
}
