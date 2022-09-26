import { FormEvent, ReactNode } from 'react';
// import { useRouter } from 'next/router';
import { useNoteContext, useSession } from '@lilith/contexts';

import { Input, Button } from '@lilith/components';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { user } = useSession();
  const { noteForm, handleAdd, handleChange } = useNoteContext();
  const { token } = user;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd();
  };

  return (
    <>
      {token && (
        <header role="navigation">
          <div className="container-form-input">
            <form onSubmit={handleSubmit}>
              {/* resolve error with this input */}
              <Input type="text" className="input-note" placeholder="title of note" value={noteForm} onInput={handleChange} />
              <Button className="button-note-save">save note</Button>
            </form>
          </div>
        </header>
      )}
      {children}
    </>
  );
};
