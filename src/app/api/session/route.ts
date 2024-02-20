import * as jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

import { User } from '@lilith/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, username } = body;
    const userFound = await User.findOne({ username });
    const { JWT_PASSWORD } = process.env;
    const message = 'this username not exist';

    if (!userFound) return Response.json({ error: 400, message }, { status: 400 });

    const isCorrectPassword = await bycrypt.compare(password, userFound.passwordHashed);
    const userResponse = {
      username,
      rol: 'HUMAN',
    };

    if (!isCorrectPassword) return Response.json({ error: 400, message: 'the username or pasword is incorrect' }, { status: 400 });

    const token = jwt.sign({ ...userResponse, id: userFound.id }, JWT_PASSWORD as string);

    return Response.json({ id: userFound.id, ...userResponse, token }, { status: 201 });
  } catch (err) {
    console.log('[+] ERROR:', err);
    return Response.json({ message: 'error to try to create a new user' }, { status: 400 });
  }
}
