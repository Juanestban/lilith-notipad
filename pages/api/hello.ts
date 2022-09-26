import type { NextApiRequest, NextApiResponse } from 'next';

import { Epic } from '@lilith/models/Epic';
import { withAuth } from '@lilith/middlewares/handleAuth';

interface Data {
  name: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  if (req.method === 'GET') {
    return res.status(200).json({ name: 'John Doe' });
  }

  if (req.method === 'POST') {
    const epicNote = new Epic(req.body);

    const savedEpicNote = await epicNote.save();

    return res.status(202).json(savedEpicNote);
  }

  return res.status(200).json({ name: 'hellow!' });
}

export default withAuth(handler);
