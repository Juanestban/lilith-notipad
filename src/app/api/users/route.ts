import * as jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

import { User } from '@lilith/models/User';
import { withAuth } from '@lilith/middlewares/handleAuth';

export async function GET(req: Request) {
  try {
    const { error, authJwt, message } = withAuth(req) as any;

    if (error) {
      return Response.json({ error, message }, { status: error });
    }

    const { id: userId } = authJwt;
    const userFound = await User.findById(userId);

    if (!userFound) return Response.json({ message: "this user don't exist", status: 404 }, { status: 404 });
    const { username, rol, id } = userFound;

    return Response.json({ id, username, rol }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error, message: 'error to try to find the user' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const { body } = req;
    const { password, username } = body as any;
    const usernameValidation = await User.findOne({ username });
    const { JWT_PASSWORD } = process.env;
    const message = 'this username already exist';

    if (usernameValidation) return Response.json({ error: 409, message }, { status: 409 });

    const saltRounds = 10;
    const passwordHashed = await bycrypt.hash(password, saltRounds);
    const userResponse = {
      username,
      rol: 'HUMAN',
    };
    const userSchema = new User({ ...userResponse, passwordHashed });

    const savedUser = await userSchema.save();
    const token = jwt.sign({ ...userResponse, id: savedUser.id }, JWT_PASSWORD as string);

    return Response.json({ id: savedUser.id, ...userResponse, token }, { status: 201 });
  } catch (err) {
    console.log('[+] ERROR:', err);
    return Response.json({ message: 'error to try to create a new user' }, { status: 400 });
  }
}
