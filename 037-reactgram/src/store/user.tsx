import React, { ReactElement, createContext } from 'react';
import useSWR from 'swr';
import { extractUserData } from '../utils/auth';

interface Props {
  children: ReactElement;
}

const USERID = localStorage.getItem('userId');

const userContext = createContext(null);
const { Provider } = userContext;

function UserProvider({ children }: Props): ReactElement {
  const { data } = useSWR(
    `https://reactgram-ac3b0.firebaseio.com/users.json?orderBy="userId"&equalTo="${USERID}"`
  );
  const [userData] = extractUserData(data);

  return <Provider value={{ ...userData }}>{children}</Provider>;
}

export { userContext, UserProvider };
