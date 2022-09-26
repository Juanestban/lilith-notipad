import { FC } from 'react';
import { useRouter } from 'next/router';

import { Note as INote } from '@lilith/interfaces';
import { useNoteContext } from '@lilith/contexts';
import { Button } from '../Button';

import s from './Note.module.css';

interface NoteProps extends INote {}

const Note: FC<NoteProps> = ({ id, title, description }) => {
  const navigate = useRouter();
  const { handleDelete } = useNoteContext();

  const handleRemove = (id: string | undefined) => async () => {
    id && handleDelete(id);
    await navigate.push('/home');
  };

  const handleNavigation = async () => {
    id && (await navigate.push({ pathname: '/note/[idNote]', query: { idNote: id } }));
  };

  return (
    <div className={s.container} tabIndex={0}>
      <div className={s.link} style={{ height: '100%', display: 'block' }} onClick={handleNavigation}>
        <h3 className={s.title}>
          {title}
          <span>{id}</span>
        </h3>
        <p>{description}</p>
      </div>
      <Button className={s.buttonDeleteNote} variant="danger" onClick={handleRemove(id)}>
        delete
      </Button>
    </div>
  );
};

export default Note;
export type { NoteProps };
