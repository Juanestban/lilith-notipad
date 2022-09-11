import type { NextApiRequest, NextApiResponse } from 'next';

import httpServer from '@lilith/libs/httpServer';
import { LilithMethods } from '@lilith/interfaces';

const MOCK_AUTH_API = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req;
  const newUrlApi = url?.replace('/auth?nextApi=', '');

  res.redirect(newUrlApi ?? '404');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const allMethods: LilithMethods = { GET: MOCK_AUTH_API, POST: MOCK_AUTH_API, DELETE: MOCK_AUTH_API, PATH: MOCK_AUTH_API, PUT: MOCK_AUTH_API };

  return httpServer(method, allMethods, req, res);
}
