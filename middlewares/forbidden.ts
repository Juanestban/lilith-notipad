import type { NextApiResponse } from 'next';

export const forbidden = (res: NextApiResponse) => res.status(403).json({ error: 403, message: 'token missing or invalid' });
