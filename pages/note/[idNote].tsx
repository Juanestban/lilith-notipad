import { useEffect, FormEvent } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cn from 'classnames';

import { Button, Input, Spinner } from '@lilith/components';
import { useNoteContext } from '@lilith/contexts';

import s from '../../styles/NotePage.module.css';

const NotePage: NextPage = () => {
  const { query, ...navigate } = useRouter();
  const { idNote } = query as { idNote: string | undefined };
  const { notes, noteToEdit, loadingSpinner, handleEdit, handleSet, handleClear, handleDelete } = useNoteContext();

  const handleChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    idNote && handleEdit({ id: idNote, name, value });
  };

  const handleRemove = (id: string | undefined) => async () => {
    id && handleDelete(id);
    await navigate.push('/home');
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
      <Head>
        <title>{noteToEdit.title}</title>
      </Head>
      <div className={s.containerButtons}>
        <Link href="/home">
          <a className={s.linkToBack} onClick={handleClear}>
            go home
          </a>
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
};

export default NotePage;
