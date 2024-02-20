import { withAuth } from '@lilith/middlewares/handleAuth';
import { Epic } from '@lilith/models/Epic';

export async function GET(req: Request) {
  try {
    const { authJwt, error, message } = withAuth(req) as any;

    if (error) {
      return Response.json({ error, message }, { status: error });
    }

    const { id: userId } = authJwt;
    const epicNotes = await Epic.find({ userId });

    return Response.json(epicNotes ?? [], { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'error to try to get your notes' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authJwt, error, message } = withAuth(req) as any;

    if (error) {
      return Response.json({ error, message }, { status: error });
    }

    const { id } = authJwt;
    const epicNote = new Epic({ ...body, userId: id });

    const noteSaved = await epicNote.save();
    const { createdAt, updatedAt } = noteSaved;

    return Response.json({ id: epicNote.id, ...body, userId: id, createdAt, updatedAt }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'error to try to get your notes' }, { status: 400 });
  }
}
