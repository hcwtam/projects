import axios from 'axios';

type FormData = {
  email: string;
  fullName?: string;
  password: string;
  username?: string;
};

export interface UserData {
  email: string;
  fullName: string;
  userId: string;
  username: string;
  website?: string;
  bio?: string;
  uid?: string;
  bookmarks?: string[];
  followers?: string[];
  following: string[];
  avatarUrl?: string;
}

export const usernameExists = async (username: string) => {
  const users: UserData[] = await axios.get(
    `https://reactgram-ac3b0.firebaseio.com/users.json`
  );
  const usernames = extractUsernames(users);
  return usernames.includes(username);
};

const extractUsernames = (r: UserData[]) => {
  let usernames = [];
  for (let key in r) {
    usernames.push(r[key].username);
  }

  return usernames;
};

export const extractUserData = (r: UserData) => {
  let user = [];
  for (let key in r) {
    user.push({ ...r[key], uid: key });
  }

  return user;
};

export const autoLogin = async () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  const authData = await login({
    email: 'test@test.com',
    password: '123456'
  });

  return authData;
};

export const login = async (values: FormData) => {
  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      { ...values, returnSecureToken: true }
    )
    .then((res) => {
      // console.log(res);
      const expirationDate = new Date(
        new Date().getTime() + parseInt(res.data.expiresIn) * 1000
      ).toString();

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', res.data.localId);
      return [res.data.idToken, res.data.localId];
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
      return null;
    });
};

export const signup = async (values: FormData) => {
  const { email, fullName, username } = values;

  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
      { ...values, returnSecureToken: true }
    )
    .then((res) => {
      console.log(res);
      const expirationDate = new Date(
        new Date().getTime() + parseInt(res.data.expiresIn) * 1000
      ).toString();

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', res.data.localId);

      return axios
        .post(`https://reactgram-ac3b0.firebaseio.com/users.json`, {
          email,
          fullName,
          username,
          userId: res.data.localId
        })
        .then((r) => {
          console.log([res.data.idToken, res.data.localId]);
          return [res.data.idToken, res.data.localId];
        })
        .catch((err) => {
          console.log(err.response.data.error.message);
          return null;
        });
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
      return null;
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
};
