import { NextApiResponse } from 'next';

import httpServer from '@lilith/libs/httpServer';
import { withAuth } from '@lilith/middlewares/handleAuth';
import { EpicApiRequest } from '@lilith/interfaces';
import { Epic } from '@lilith/models/Epic';

const GET = async (req: EpicApiRequest, res: NextApiResponse) => {
  try {
    const { authJwt } = req;
    const { id: userId } = authJwt;
    const epicNotes = await Epic.find({ userId });

    console.log(epicNotes);
    return res.status(200).json(epicNotes ?? []);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'error to try to get your notes' });
  }
};

const POST = async (req: EpicApiRequest, res: NextApiResponse) => {
  try {
    const { body, authJwt } = req;
    const { id } = authJwt;
    const epicNote = new Epic({ ...body, userId: id });

    await epicNote.save();

    return res.status(200).json({ id: epicNote.id, ...body, userId: id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'error to try to get your notes' });
  }
};

function handleEpic(req: EpicApiRequest, res: NextApiResponse) {
  const { method } = req;
  const methods = { GET, POST };

  return httpServer(method, methods, req, res);
}

export default withAuth(handleEpic);
