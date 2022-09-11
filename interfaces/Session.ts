import { ReactNode } from 'react';

export type UserRol = 'GOD' | 'HUMAN';

export interface UserSessionValidation {
  username: string;
  password: string;
}

export interface UserSession {
  id: string;
  username: string;
  rol: UserRol;
  password?: string;
}

export interface SessionContextProps {
  user: UserSession;
  loading: boolean;
  handleUser: (user: UserSession) => void;
}

export interface SessionProviderProps {
  children: ReactNode;
}
