import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../../reducers';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const reducerInitialState = {
  auth: {
    token: null,
    userId: null,
    error: null,
    loading: false,
    details: null
  },
  order: {
    items: [],
    totalPrice: 0,
    sum: 0,
    loading: false,
    error: null,
    success: false,
    timestamp: null,
    orders: null
  },
  shop: {
    items: [],
    loading: false,
    error: null
  }
};

// re-export everything
export * from '@testing-library/react';

// override render method

export const render = (
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk))
    )
  } = {}
) => {
  return rtlRender(<Provider store={store}>{ui}</Provider>);
};
