import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { NoteProvider, SessionProvider } from '@lilith/contexts';
import { Wrapper } from '@lilith/config/Wrapper';
import { LOCAL_STORAGE_TOKEN } from '@lilith/config/constants';
import { Loading } from '@lilith/components';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSideClient, setIsSideClient] = useState(true);
  const { pathname, push } = useRouter();

  const getClientAndSession = async () => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const isLogged = !token ? '/login' : '/home';
    const pageUnavalaible = ['/', '/_error', '/login'];

    if (token && pageUnavalaible.includes(pathname)) {
      await push('/home');
      setIsSideClient(false);
      return;
    }

    await push(isLogged);
    setIsSideClient(false);
  };

  useEffect(() => {
    getClientAndSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSideClient)
    return (
      <div className="container-loading">
        <Loading size="x-large" />
      </div>
    );

  return (
    <main className="main-container">
      <SessionProvider>
        <NoteProvider>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </NoteProvider>
      </SessionProvider>
    </main>
  );
}

export default MyApp;
