import { ActionTypes } from '../actions/types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  details: null
};

const authStart = (state, action) => {
  return { ...state, error: null, loading: true };
};
const authFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };
};

const authLogout = (state, action) => {
  return { ...state, token: null, userId: null };
};

const addUserDetail = (state, action) => {
  return { ...state, details: action.details };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.authStart:
      return authStart(state, action);
    case ActionTypes.authFail:
      return authFail(state, action);
    case ActionTypes.authSuccess:
      return authSuccess(state, action);
    case ActionTypes.authLogout:
      return authLogout(state, action);
    case ActionTypes.addUserDetail:
      return addUserDetail(state, action);

    default:
      return state;
  }
};
