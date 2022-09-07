import { useEffect, FormEvent } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { Button, Input } from '@lilith/components';
import { useNoteContext } from '@lilith/contexts';

import s from '../../styles/NotePage.module.css';

interface NotePageProps {
  idNote?: string;
}

const NotePage: NextPage<NotePageProps> = ({ idNote }) => {
  const navigate = useRouter();
  const { notes, noteToEdit, handleEdit, handleSet, handleClear, handleDelete } = useNoteContext();

  const handleChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    const idNumber = Number(idNote);

    idNote && handleEdit({ id: idNumber, name, value });
  };

  const handleRemove = (id: string | undefined) => async () => {
    const idNormal = Number(id);

    id && handleDelete(idNormal);
    await navigate.push('/home');
  };

  useEffect(() => {
    const idNormal = Number(idNote);
    const filtered = notes.find((n) => n.id === idNormal);
    if (filtered != null) {
      console.log(filtered);
      const { title, description } = filtered;
      handleSet({ id: idNormal, title, description });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNote]);

  return (
    <section>
      <div className={s.containerButtons}>
        <Link href="/" onClick={handleClear}>
          <a>go home</a>
        </Link>
        <Button variant="danger" onClick={handleRemove(idNote)}>
          delete
        </Button>
      </div>
      <hr style={{ borderColor: 'gray', marginTop: 10, marginBottom: 20 }} />
      <div className={s.containerLabel}>
        <label>
          title:
          <Input type="text" name="title" value={noteToEdit.title} className={s.input} />
        </label>
        <label>
          description:
          <textarea
            name="description"
            className={cn(s.input, s.textarea)}
            value={noteToEdit.description}
            autoComplete="off"
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
    </section>
  );
};

export default NotePage;
