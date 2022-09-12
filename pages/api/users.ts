import { NextApiRequest, NextApiResponse } from 'next';
import bycrypt from 'bcrypt';

import { withAuth } from '@lilith/middlewares/handleAuth';
import httpServer from '@lilith/libs/httpServer';
import { User } from '@lilith/models/User';

const GET = async (_: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ users: [] });
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req;
    const { password, username } = body;
    const usernameValidation = await User.findOne({ username });
    const message = 'this username already exist';

    if (usernameValidation) return res.status(409).json({ error: 409, message });

    const saltRounds = 10;
    const passwordHashed = await bycrypt.hash(password, saltRounds);
    const userForCreate = new User({
      username,
      passwordHashed,
      rol: 'HUMAN',
    });

    const savedUser = await userForCreate.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    console.log('[+] ERROR:', err);
    return res.status(400).json({ message: 'error to try to create a new user' });
  }
};

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const methods = { GET, POST };

  return httpServer(method, methods, req, res);
}

export default withAuth(handler);
