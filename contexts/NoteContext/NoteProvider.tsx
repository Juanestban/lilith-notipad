import { useState, useEffect, createContext, useContext, FormEvent } from 'react';

import httpClient from '@lilith/libs/httpClient';
import { Note, NoteContextProps, NoteProviderProps, Edit } from '@lilith/interfaces';
import { mockFc } from '@lilith/utils/mocks';
import { debounce } from '@lilith/utils/debounce';
import { useSession } from '../SessionContext';

const NOTE_TEMPLATE: Note = {
  id: '',
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

function NoteProvider({ children }: NoteProviderProps) {
  const [noteForm, setNoteForm] = useState('');
  const [noteToEdit, setNoteToEdit] = useState<Note>(NOTE_TEMPLATE);
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useSession();
  const { token } = user;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    setNoteForm(value);
  };

  const handleAdd = async () => {
    if (noteForm !== '' && token) {
      try {
        const newNote: Note = { title: noteForm, description: '' };

        const { data: noteCreated } = await httpClient.post('epics', newNote, { headers: { Authorization: `Bearer ${token}` } });

        setNotes([...notes, noteCreated]);

        setNoteForm('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateEpicNote = async (note: Note) => {
    try {
      if (token) {
        const { data: noteUpdated } = await httpClient.patch(`/epics/${note.id}`, note, { headers: { Authorization: `Bearer ${token}` } });
        const filteredEpics = notes.map((n) => {
          return n.id === noteUpdated.id ? noteUpdated : n;
        });

        console.log('petition', noteUpdated);
        setNotes(filteredEpics);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = ({ id, name, value }: Edit) => {
    setNoteToEdit({ ...noteToEdit, [name]: value });

    debounce(() => updateEpicNote({ ...noteToEdit, id, [name]: value }));
  };

  const handleSet = (note: Note) => setNoteToEdit(note);

  const handleClear = () => setNoteToEdit(NOTE_TEMPLATE);

  const handleDelete = async (id: string) => {
    try {
      if (token) {
        await httpClient.delete(`/epics/${id}`, { headers: { Authorization: `Bearer ${token}` } });

        const newEpics = notes.filter((n) => n.id !== id);

        setNotes(newEpics);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const gettingEpicsNote = async () => {
    try {
      if (token) {
        const { data: notes } = await httpClient.get('/epics', { headers: { Authorization: `Bearer ${token}` } });
        setNotes(notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      gettingEpicsNote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
