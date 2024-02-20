'use client';
import { useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import cn from 'classnames';

import { Button, Input, Spinner } from '@lilith/components';
import { useNoteContext } from '@lilith/contexts';

import s from './noteid.module.css';

export default function NoteIdClient() {
  const navigate = useRouter();
  const { idNote } = useParams<{ idNote?: string; string?: string }>();
  const { notes, noteToEdit, loadingSpinner, handleEdit, handleSet, handleClear, handleDelete } = useNoteContext();

  const handleChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    idNote && handleEdit({ id: idNote, name, value });
  };

  const handleRemove = (id: string | undefined) => () => {
    id && handleDelete(id);
    navigate.push('/home');
  };

  useEffect(() => {
    const filtered = notes.find((n) => n.id === idNote);

    if (filtered) {
      const { title, description } = filtered;
      handleSet({ id: idNote, title, description });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNote]);

  return (
    <section>
      <div className={s.containerButtons}>
        <Link href="/home" className={s.linkToBack} onClick={handleClear}>
          go home
        </Link>
        <Button variant="danger" onClick={handleRemove(idNote)}>
          delete
        </Button>
      </div>
      <hr style={{ borderColor: 'gray', marginTop: 10, marginBottom: 20 }} />
      <div className={s.containerLabel}>
        <label>
          title:
          <Input type="text" name="title" value={noteToEdit.title} className={s.input} onChange={handleChange} />
        </label>
        <label className={s.labelTextarea}>
          description:
          {/* resolve error with this input */}
          <textarea
            name="description"
            className={cn(s.input, s.textarea)}
            value={noteToEdit.description}
            autoComplete="off"
            onInput={handleChange}
          ></textarea>
          {loadingSpinner && <Spinner size={40} className={s.spinner} />}
        </label>
      </div>
    </section>
  );
}
