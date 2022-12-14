import { NextApiResponse } from 'next';

import httpServer from '@lilith/libs/httpServer';
import { withAuth } from '@lilith/middlewares/handleAuth';
import { EpicApiRequest } from '@lilith/interfaces';
import { Epic } from '@lilith/models/Epic';

const PATCH = async (req: EpicApiRequest, res: NextApiResponse) => {
  try {
    const { body, authJwt, query } = req;
    const { id: userId } = authJwt;
    const { id: idNote } = query;

    const noteUpdated = await Epic.findByIdAndUpdate(idNote, body, { new: true }).where('userId').equals(userId);
    const { createdAt, updatedAt } = noteUpdated;

    return res.status(200).json({ id: idNote, ...body, userId, createdAt, updatedAt });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'error to try to update your note' });
  }
};

const DELETE = async (req: EpicApiRequest, res: NextApiResponse) => {
  try {
    const { query, authJwt } = req;
    const { id: userId } = authJwt;
    const { id: idNote } = query;

    await Epic.findByIdAndDelete(idNote).where('userId').equals(userId);

    return res.status(200).json({ message: `the note (ObjectId:${idNote}) has deleted` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'error to try to delete your note' });
  }
};

function handleEpic(req: EpicApiRequest, res: NextApiResponse) {
  const { method } = req;
  const methods = { PATCH, DELETE };

  return httpServer(method, methods, req, res);
}

export default withAuth(handleEpic);
