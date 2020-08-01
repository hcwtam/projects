import { ActionTypes } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const fetchStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchSuccess = (state, action) => {
  return { ...state, items: action.items, loading: false };
};

const fetchFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.fetchStart:
      return fetchStart(state, action);
    case ActionTypes.fetchSuccess:
      return fetchSuccess(state, action);
    case ActionTypes.fetchFail:
      return fetchFail(state, action);

    default:
      return state;
  }
};
