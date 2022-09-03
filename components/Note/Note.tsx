import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

import { Note as INote } from "@lilith/interfaces";
import { useNoteContext } from "@lilith/contexts";
import { Button } from "../Button";

import s from "./Note.module.css";

interface NoteProps extends INote {
  // ...
}

const Note: FC<NoteProps> = ({ id, title, description }) => {
  const navigate = useRouter();
  const { handleDelete } = useNoteContext();
  const classes = cn(s.title);

  const handleRemove = (id: number | undefined) => () => {
    id && handleDelete(id);
    navigate.push("/home");
  };

  return (
    <div className={s.container} tabIndex={0}>
      <Link
        href={`/note/${id}`}
        className={s.link}
        style={{ height: "100%", display: "block" }}
      >
        <h3 className={classes}>
          {title}
          <span>{id}</span>
        </h3>
        <p>{description}</p>
      </Link>
      <Button
        className={s.buttonDeleteNote}
        variant="danger"
        onClick={handleRemove(id)}
      >
        delete
      </Button>
    </div>
  );
};

export default Note;
export type { NoteProps };
