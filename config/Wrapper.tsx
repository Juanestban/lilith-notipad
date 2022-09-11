import { FormEvent, ReactNode } from 'react';
// import { useRouter } from 'next/router';
import { useNoteContext } from '@lilith/contexts';

import { Input, Button } from '@lilith/components';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  // const { pathname } = useRouter();
  const { noteForm, handleAdd, handleChange } = useNoteContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd();
  };

  // useEffect(() => {
  //   pathname === '/' && navigate.push('/home');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.href]);

  return (
    <>
      <header role="navigation">
        <div className="container-form-input">
          <form onSubmit={handleSubmit}>
            <Input type="text" className="input-note" placeholder="title of note" value={noteForm} onChange={handleChange} />
            <Button className="button-note-save">save note</Button>
          </form>
        </div>
      </header>
      {children}
    </>
  );
};
