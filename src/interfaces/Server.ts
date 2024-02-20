import type { NextApiRequest, NextApiResponse } from 'next';

import type { EpicApiRequest } from '@lilith/interfaces';

export type MethodName = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type LilithMethods<T = NextApiRequest | EpicApiRequest> = {
  [methods in MethodName]: (req: T, res: NextApiResponse) => Promise<void> | void;
};
