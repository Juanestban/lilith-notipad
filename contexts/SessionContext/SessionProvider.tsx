import { createContext, useState, useContext } from 'react';

import { SessionProviderProps, SessionContextProps, UserSession } from '@lilith/interfaces';
import { mockFc } from '@lilith/utils/mocks';
import { USER_INITIAL_STATE } from '@lilith/config/constants';

const SessionContext = createContext<SessionContextProps>({
  user: USER_INITIAL_STATE,
  loading: false,
  handleUser: mockFc,
});

function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<UserSession>(USER_INITIAL_STATE);
  const [loading] = useState(false);

  const handleUser = (user: UserSession) => setUser(user);

  return <SessionContext.Provider value={{ loading, user, handleUser }}>{children}</SessionContext.Provider>;
}

const useSession = () => useContext(SessionContext);

export { SessionContext, useSession };
export default SessionProvider;
