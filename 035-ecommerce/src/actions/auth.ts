import axios from 'axios';
import { Dispatch } from 'redux';

import { ActionTypes } from './types';

export const authStart = () => {
  return {
    type: ActionTypes.authStart
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: ActionTypes.authSuccess,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: ActionTypes.authFail,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: ActionTypes.authLogout
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email: string, password: string, isLogin: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;

    if (!isLogin)
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + parseInt(res.data.expiresIn) * 1000
        ).toString();

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch<any>(checkAuthTimeout(+res.data.expiresIn * 1000));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch<any>(
          checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};

export const addUserDetail = (details) => {
  return {
    type: ActionTypes.addUserDetail,
    details
  };
};

export const uploadUserDetail = (details, userId, token) => {
  return (dispatch: Dispatch) => {
    const url = `https://ecommerce-5bec3.firebaseio.com/users.json?auth=${token}`;
    const data = { ...details, userId };

    axios.post(url, data).then((res) => {
      console.log(res);
    });
  };
};
