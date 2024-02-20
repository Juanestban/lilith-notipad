import { NextRequest } from 'next/server';

import { withAuth } from '@lilith/middlewares/handleAuth';
import { Epic } from '@lilith/models/Epic';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, message, authJwt } = withAuth(req as any) as any;

    if (error) {
      return Response.json({ error, message }, { status: error });
    }

    const { id: userId } = authJwt;
    const { id: idNote } = body;

    const noteUpdated = await Epic.findByIdAndUpdate(idNote, body, { new: true }).where('userId').equals(userId);
    const { createdAt, updatedAt } = noteUpdated;

    return Response.json({ id: idNote, ...body, userId, createdAt, updatedAt }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'error to try to update your note' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { error, message, authJwt } = withAuth(req) as any;

    if (error) {
      return Response.json({ error, message }, { status: error });
    }

    const { id: userId } = authJwt;
    const { id: idNote } = body;

    await Epic.findByIdAndDelete(idNote).where('userId').equals(userId);

    return Response.json({ message: `the note (ObjectId:${idNote}) has deleted` }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'error to try to delete your note' }, { status: 400 });
  }
}
