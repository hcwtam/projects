import { FetchTodosAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
  fetchTodos,
  DeleteTodo
}

export type Action = FetchTodosAction | DeleteTodoAction;
