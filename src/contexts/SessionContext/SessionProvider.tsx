'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import { redirect, usePathname } from 'next/navigation';

import { SessionProviderProps, SessionContextProps, UserSession } from '@lilith/interfaces';
import { mockFc } from '@lilith/utils/mocks';
import { LOCAL_STORAGE_TOKEN, USER_INITIAL_STATE } from '@lilith/config/constants';
import httpClient from '@lilith/utils/httpClient';

const SessionContext = createContext<SessionContextProps>({
  user: USER_INITIAL_STATE,
  loading: false,
  handleUser: mockFc,
});

function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<UserSession>(USER_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleUser = (user: UserSession) => setUser(user);

  const getUser = async () => {
    try {
      setLoading(true);
      const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);

      if (token) {
        const { data: user } = await httpClient.get('/users', { headers: { Authorization: `Bearer ${token}` } });

        handleUser({ ...user, token });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);

    if (token) {
      getUser();
    }

    if (!token && pathname.includes('home')) {
      redirect('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <SessionContext.Provider value={{ loading, user, handleUser }}>{children}</SessionContext.Provider>;
}

const useSession = () => useContext(SessionContext);

export { SessionContext, useSession };
export default SessionProvider;
