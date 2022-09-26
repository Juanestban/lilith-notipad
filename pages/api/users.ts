import * as jwt from 'jsonwebtoken';
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
    const { JWT_PASSWORD } = process.env;
    const message = 'this username already exist';

    if (usernameValidation) return res.status(409).json({ error: 409, message });

    const saltRounds = 10;
    const passwordHashed = await bycrypt.hash(password, saltRounds);
    const userResponse = {
      username,
      rol: 'HUMAN',
    };
    const userSchema = new User({ ...userResponse, passwordHashed });

    const savedUser = await userSchema.save();
    const token = jwt.sign({ ...userResponse, id: savedUser.id }, JWT_PASSWORD as string);

    return res.status(201).json({ id: savedUser.id, ...userResponse, token });
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
