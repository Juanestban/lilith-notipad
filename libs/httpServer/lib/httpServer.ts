import type { NextApiRequest, NextApiResponse } from 'next';

import { MethodName, LilithMethods } from '@lilith/interfaces';

const httpServer = (method: string | undefined, methods: Partial<LilithMethods>, req: NextApiRequest, res: NextApiResponse) => {
  const switcherMethods = methods[method as MethodName];

  if (switcherMethods) {
    switcherMethods(req, res);
    return;
  }

  res.status(404).json({ message: 'this method dont exist' });
};

export default httpServer;
