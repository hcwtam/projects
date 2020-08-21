import React, { ReactElement, useState, useEffect, createContext } from 'react';
import { autoLogin } from '../utils/auth';

interface Props {
  children: ReactElement;
}

const authContext = createContext(null);
const { Provider } = authContext;

function AuthProvider({ children }: Props): ReactElement {
  const [token, setToken] = useState<string | null | void>(null);
  const [userId, setUserId] = useState<string | null | void>(null);

  useEffect(() => {
    const fetchLogin = async () => {
      const localToken = localStorage.getItem('token');
      const localUserId = localStorage.getItem('userId');
      if (localToken && localUserId) {
        setToken(localToken);
        setUserId(localUserId);
      } else if (
        token === null &&
        userId === null &&
        !localToken &&
        !localUserId
      ) {
        const [newToken, newUserId] = await autoLogin();
        console.log(newToken);

        setToken(newToken);
        setUserId(newUserId);
      }
    };
    fetchLogin();
  }, [token, userId]);

  return (
    <Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </Provider>
  );
}

export { authContext, AuthProvider };
