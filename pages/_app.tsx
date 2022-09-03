import { useState, useEffect, FormEvent } from "react";
import type { AppProps } from "next/app";
import { Input, Button } from "@lilith/components";
import { NoteProvider, useNoteContext } from "@lilith/contexts";
import { Wrapper } from "@lilith/config/Wrapper";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSideClient, setIsSideClient] = useState(false);
  const { noteForm, handleAdd, handleChange } = useNoteContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd();
  };

  useEffect(() => {
    setIsSideClient(true);
  }, []);

  if (!isSideClient) return <>loading</>;

  return (
    <Wrapper>
      <main className="main-container">
        <header role="navigation">
          <div className="container-form-input">
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                className="input-note"
                placeholder="title of note"
                value={noteForm}
                onChange={handleChange}
              />
              <Button className="button-note-save">save note</Button>
            </form>
          </div>
        </header>
        <NoteProvider>
          <Component {...pageProps} />
        </NoteProvider>
      </main>
    </Wrapper>
  );
}

export default MyApp;
