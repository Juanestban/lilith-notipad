import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import jwt, { Secret } from 'jsonwebtoken';

export const handleAuth = (req: NextRequest) => {
  const { headers, method, url } = req;
  const path = new URL(url).pathname;
  const authorization = headers.get('authorization');

  const { JWT_PASSWORD } = process.env;
  let token = '';
  let decodedToken: any = {};
  const pathname = path.substring(1);

  if ((pathname === 'users' && method === 'POST') || pathname === 'login') return NextResponse.next();

  if (authorization?.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  try {
    decodedToken = jwt.verify(token, JWT_PASSWORD as Secret);
  } catch {}

  if (!token || !decodedToken.id)
    return new Response(JSON.stringify({ error: 401, message: 'token missing or invalid' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    }).json();

  return NextResponse.next();
};
