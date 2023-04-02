import { FormEvent } from 'react';
import Head from 'next/head';

import { useNoteContext } from '@lilith/contexts';
import { Input, Button, Note, Spinner } from '@lilith/components';

import s from '../styles/HomePage.module.css';

export default function Home() {
  const { notes, noteForm, loadingSpinner, handleAdd, handleChange } = useNoteContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd();
  };

  return (
    <>
      <Head>
        <title>home - notipad</title>
      </Head>
      <header role="navigation">
        <div className="container-form-input">
          <form onSubmit={handleSubmit}>
            {/* resolve error with this input */}
            <div className={s.formNote}>
              <Input type="text" className={s.inputNote} placeholder="title of note" value={noteForm} onInput={handleChange} />
              {loadingSpinner && <Spinner size={30} className={s.spinner} />}
            </div>
            <Button className={s.buttonNoteSave}>save note</Button>
          </form>
        </div>
      </header>
      <div className={s.container}>
        {notes.length === 0 && <h2 className={s.titleNotesEmpty}>Create your first note!</h2>}
        <article className={s.article}>
          {notes.map((note) => (
            <Note key={note.id} {...note} />
          ))}
        </article>
      </div>
    </>
  );
}
