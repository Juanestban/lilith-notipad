import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { NoteProvider } from '@lilith/contexts';
import { Wrapper } from '@lilith/config/Wrapper';
// import mongoose from "mongoose";

import '../styles/globals.css';

// mongoose.connect("mongodb atlas", {}, () => {});

function MyApp({ Component, pageProps }: AppProps) {
  const [isSideClient, setIsSideClient] = useState(false);

  useEffect(() => {
    setIsSideClient(true);
  }, []);

  if (!isSideClient) return <>loading</>;

  return (
    <main className="main-container">
      <NoteProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </NoteProvider>
    </main>
  );
}

export default MyApp;
