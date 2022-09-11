import type { NextApiRequest, NextApiResponse } from 'next';

import { MethodName, LilithMethods } from '@lilith/interfaces';

const httpServer = (method: string | undefined, methods: Partial<LilithMethods>, req: NextApiRequest, res: NextApiResponse) => {
  const switcherMethods = methods[method as MethodName];
  const { query } = req;

  if (!query.nextApi) {
    res.status(500).json({ message: 'need query `nextApi` before to follow the next action' });
    return;
  }

  if (switcherMethods) {
    switcherMethods(req, res);
    return;
  }

  res.status(404).json({ message: 'this method dont exist' });
};

export default httpServer;
