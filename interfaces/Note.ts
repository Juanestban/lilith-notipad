import { ReactNode, FormEvent } from 'react';

export interface Note {
  id?: string;
  title: string;
  description: string;
  userId?: string;
}

export interface Edit {
  id: string;
  name: string;
  value: string;
}

export interface NoteContextProps {
  noteForm: string;
  noteToEdit: Note;
  loading: boolean;
  notes: Note[];
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleClear: () => void;
  handleEdit: (noteToEdit: Edit) => void;
  handleSet: (note: Note) => void;
  handleDelete: (id: string) => void;
}

export interface NoteProviderProps {
  children: ReactNode;
}
