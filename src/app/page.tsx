'use client';
import Link from 'next/link';

import { Input, Button, Note, Spinner } from '@lilith/components';
import type { Note as INote } from '@lilith/interfaces';

import s from './page.module.css';

export default function Index() {
  const noteForm = '';
  const notes: INote[] = [];
  const loadingSpinner = true;

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <>
      <header>
        <ul>
          <li>
            <Link href="/login">sign in</Link>
          </li>
          <li>
            <Link href="/home">home</Link>
          </li>
        </ul>
      </header>
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
