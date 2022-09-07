import { useState, createContext, useContext, ReactNode, FormEvent } from 'react';
import { Note } from '@lilith/interfaces';
import { getId } from '@lilith/utils/getId';
import { mockFc } from '@lilith/utils/mocks';

interface Edit {
  id: number;
  name: string;
  value: string;
}

interface NoteContextProps {
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

interface NoteProviderProps {
  children: ReactNode;
}

const NOTE_TEMPLATE: Note = {
  id: 0,
  title: '',
  description: '',
};

const NoteContext = createContext<NoteContextProps>({
  noteForm: '',
  noteToEdit: NOTE_TEMPLATE,
  notes: [],
  handleChange: mockFc,
  handleAdd: mockFc,
  handleEdit: mockFc,
  handleClear: mockFc,
  handleSet: mockFc,
  handleDelete: mockFc,
});

const keystorage = '@LILITH_NOTE';

function NoteProvider({ children }: NoteProviderProps) {
  const [noteForm, setNoteForm] = useState('');
  const [noteToEdit, setNoteToEdit] = useState<Note>(NOTE_TEMPLATE);
  const [notes, setNotes] = useState<Note[]>(() => {
    const itemNotes = window.localStorage.getItem(keystorage);

    if (itemNotes !== null) {
      const notesTransformed = JSON.parse(itemNotes) as Note[];
      return notesTransformed;
    }

    return [];
  });

  const handleStorage = (notes: Note[]) => {
    setNotes(notes);
    window.localStorage.setItem(keystorage, JSON.stringify(notes));
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    console.log(value);
    setNoteForm(value);
  };

  const handleAdd = () => {
    if (noteForm !== '') {
      const newNote: Note = {
        id: getId(),
        title: noteForm,
        description: '',
      };

      handleStorage([...notes, newNote]);
      setNoteForm('');
    }
  };

  const handleEdit = ({ id, name, value }: Edit) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, [name]: value } : note));
    handleStorage(updatedNotes);
    setNoteToEdit({ ...noteToEdit, [name]: value });
  };

  const handleSet = (note: Note) => setNoteToEdit(note);

  const handleClear = () => setNoteToEdit(NOTE_TEMPLATE);

  const handleDelete = (id: number) => {
    const notesFiltered = notes.filter((n) => n.id !== id);

    handleStorage(notesFiltered);
  };

  return (
    <NoteContext.Provider
      value={{
        noteForm,
        notes,
        noteToEdit,
        handleChange,
        handleAdd,
        handleEdit,
        handleClear,
        handleSet,
        handleDelete,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

const useNoteContext = () => useContext(NoteContext);

export { NoteProvider, NoteContext, useNoteContext };
export type { NoteContextProps };
