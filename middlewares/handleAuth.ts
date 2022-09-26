import type { NextApiRequest, NextApiResponse } from 'next';
import jwt, { Secret } from 'jsonwebtoken';

import { forbidden } from './forbidden';

const pathsWithoutAuth = ['login', 'users'];

export const handleAuth = (req: NextApiRequest) => {
  const { headers, method, url: path } = req;
  const { authorization } = headers;

  const { JWT_PASSWORD } = process.env;
  let token = '';
  let decodedToken: any = {};
  const pathname = path?.replace('/api/', '');

  if (method === 'POST' && pathsWithoutAuth.includes(pathname ?? '')) return { status: 200, isUnauthorizated: false };

  if (authorization?.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  try {
    decodedToken = jwt.verify(token, JWT_PASSWORD as Secret);
  } catch {
    return { status: 403, isUnauthorizated: true };
  }

  if (!token || !decodedToken.id) return { status: 403, isUnauthorizated: true };

  return { decodedToken };
};

export const withAuth =
  <T extends Function>(callback: T) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const auth = handleAuth(req);

    if (auth?.isUnauthorizated) {
      return forbidden(res);
    }

    // eslint-disable-next-line n/no-callback-literal
    return callback({ ...req, authJwt: auth.decodedToken }, res);
  };
