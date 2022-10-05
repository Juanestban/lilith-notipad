import { FormEvent } from 'react';
import { useNoteContext } from '@lilith/contexts';
import { Input, Button, Note } from '@lilith/components';

import s from '../styles/HomePage.module.css';

export default function Home() {
  const { notes, noteForm, handleAdd, handleChange } = useNoteContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd();
  };

  return (
    <>
      <header role="navigation">
        <div className="container-form-input">
          <form onSubmit={handleSubmit}>
            {/* resolve error with this input */}
            <Input type="text" className="input-note" placeholder="title of note" value={noteForm} onInput={handleChange} />
            <Button className="button-note-save">save note</Button>
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
