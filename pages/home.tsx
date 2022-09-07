import cn from 'classnames';

import { useNoteContext } from '@lilith/contexts';
import { Note } from '@lilith/components';

import s from '../styles/HomePage.module.css';

export default function Home() {
  const { notes } = useNoteContext();
  const classes = cn(s.test);

  return (
    <div className={classes}>
      {notes.length === 0 && <h2 className={s.titleNotesEmpty}>Create your first note!</h2>}
      <article className={s.article}>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </article>
    </div>
  );
}
