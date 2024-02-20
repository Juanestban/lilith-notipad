import { NextApiRequest } from 'next';
import { Note } from './Note';

import { UserSession } from './Session';

export interface EpicApiRequest extends NextApiRequest {
  authJwt: Omit<UserSession, 'password' | 'token'>;
}

export interface EpicNote extends Note {
  userId: string;
}
