import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import bycrypt from 'bcrypt';

import { withAuth } from '@lilith/middlewares/handleAuth';
import httpServer from '@lilith/libs/httpServer';
import { User } from '@lilith/models/User';
import { EpicApiRequest } from '@lilith/interfaces';

const GET = async (req: EpicApiRequest, res: NextApiResponse) => {
  try {
    const { authJwt } = req;
    const { id: userId } = authJwt;

    const userFound = await User.findById(userId);

    if (!userFound) return res.status(404).json({ message: "this user don't exist", status: 404 });
    const { username, rol, id } = userFound;

    return res.status(200).json({ id, username, rol });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error, message: 'error to try to find the user' });
  }
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

  return httpServer<any>(method, methods, req, res);
}

export default withAuth(handler);
