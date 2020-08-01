import axios from 'axios';
import { Dispatch } from 'redux';

import { ActionTypes } from './types';

export const fetchStart = () => {
  return {
    type: ActionTypes.fetchStart,
    loading: true
  };
};
export const fetchSuccess = (items) => {
  return {
    type: ActionTypes.fetchSuccess,
    items
  };
};

export const fetchFail = (error) => {
  return {
    type: ActionTypes.fetchFail,
    error
  };
};

export const fetchItems = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchStart());

    const url = `https://ecommerce-5bec3.firebaseio.com/shop.json`;

    axios
      .get(url)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchFail(err.response.data.error));
      });
  };
};
