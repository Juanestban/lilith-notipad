import type { NextApiRequest, NextApiResponse } from 'next';

export type MethodName = 'GET' | 'POST' | 'PUT' | 'PATH' | 'DELETE';

export type LilithMethods = {
  [methods in MethodName]: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};
