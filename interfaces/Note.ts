import { ReactNode, FormEvent } from 'react';

export interface Note {
  id?: string;
  title: string;
  description: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  loadingSpinner: boolean;
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
