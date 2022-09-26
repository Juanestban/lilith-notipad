import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import bycrypt from 'bcrypt';

import httpServer from '@lilith/libs/httpServer';
import { User } from '@lilith/models/User';

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req;
    const { password, username } = body;
    const userFound = await User.findOne({ username });
    const { JWT_PASSWORD } = process.env;
    const message = 'this username not exist';

    if (!userFound) return res.status(400).json({ error: 400, message });

    const isCorrectPassword = await bycrypt.compare(password, userFound.passwordHashed);
    const userResponse = {
      username,
      rol: 'HUMAN',
    };

    if (!isCorrectPassword) return res.status(400).json({ error: 400, message: 'the username or pasword is incorrect' });

    const token = jwt.sign({ ...userResponse, id: userFound.id }, JWT_PASSWORD as string);

    return res.status(201).json({ id: userFound.id, ...userResponse, token });
  } catch (err) {
    console.log('[+] ERROR:', err);
    return res.status(400).json({ message: 'error to try to create a new user' });
  }
};

function SessionApi(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const methods = { POST };

  return httpServer(method, methods, req, res);
}

export default SessionApi;
