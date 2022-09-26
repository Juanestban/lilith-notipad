import type { NextApiRequest, NextApiResponse } from 'next';

import { MethodName, LilithMethods, EpicApiRequest } from '@lilith/interfaces';

const httpServer = <T = NextApiRequest | EpicApiRequest>(
  method: string | undefined,
  methods: Partial<LilithMethods<T>>,
  req: T,
  res: NextApiResponse
) => {
  const switcherMethods = methods[method as MethodName];

  if (switcherMethods) {
    switcherMethods(req, res);
    return;
  }

  res.status(404).json({ message: 'this method dont exist' });
};

export default httpServer;
