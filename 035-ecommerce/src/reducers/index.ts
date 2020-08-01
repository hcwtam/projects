import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { shopReducer } from './shop';
import { orderReducer } from './order';
// import { todosReducer } from './todos';
// import { Todo } from '../actions';

// export interface StoreState {
//   todos: Todo[];
// }

export const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
