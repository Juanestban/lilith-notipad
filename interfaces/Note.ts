import { ReactNode, FormEvent } from 'react';

export interface Note {
  id?: number;
  title: string;
  description: string;
  userId?: string;
}

export interface Edit {
  id: number;
  name: string;
  value: string;
}

export interface NoteContextProps {
  noteForm: string;
  noteToEdit: Note;
  notes: Note[];
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleClear: () => void;
  handleEdit: (noteToEdit: Edit) => void;
  handleSet: (note: Note) => void;
  handleDelete: (id: number) => void;
}

export interface NoteProviderProps {
  children: ReactNode;
}
