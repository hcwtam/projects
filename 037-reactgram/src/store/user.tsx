import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import useSWR from 'swr';
import { extractUserData } from '../utils/auth';
import { authContext } from './auth';

interface Props {
  children: ReactElement;
}

const userContext = createContext(null);
const { Provider } = userContext;

function UserProvider({ children }: Props): ReactElement {
  const { userId } = useContext(authContext);
  const [localBookmarks, setLocalBookmarks] = useState(null);
  const { data } = useSWR(
    userId
      ? `https://reactgram-ac3b0.firebaseio.com/users.json?orderBy="userId"&equalTo="${userId}"`
      : null
  );
  const [userData] = extractUserData(data);

  useEffect(() => {
    if (userData && !localBookmarks) setLocalBookmarks(userData.bookmarks);
  }, [userData, localBookmarks]);

  return (
    <Provider value={{ ...userData, localBookmarks, setLocalBookmarks }}>
      {children}
    </Provider>
  );
}

export { userContext, UserProvider };
