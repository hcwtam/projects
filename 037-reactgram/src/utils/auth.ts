import axios from 'axios';

type FormData = {
  email: string;
  fullName?: string;
  password: string;
  username?: string;
};

interface UserData {
  email: string;
  fullname: string;
  userId: string;
  username: string;
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
    user.push({ ...r[key] });
  }
  console.log(user);

  return user;
};

export const autoLogin = async () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  const fetchedToken = await login({
    email: 'test@test.com',
    password: '123456'
  });
  return fetchedToken;
};

export const login = async (values: FormData) => {
  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
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
      return res.data.idToken;
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
      return null;
    });
};

export const signup = (values: FormData) => {
  const { email, fullName, username } = values;

  axios
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

      axios
        .post(`https://reactgram-ac3b0.firebaseio.com/users.json`, {
          email,
          fullName,
          username,
          userId: res.data.localId
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data.error.message);
        });
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
    });
};
