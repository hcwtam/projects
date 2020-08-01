import { ActionTypes } from '../actions/types';

const initialState = {
  items: [],
  totalPrice: 0,
  sum: 0,
  loading: false,
  error: null,
  success: false,
  timestamp: null,
  orders: null
};

const AddToCart = (state, action) => {
  const newStateItems = [...state.items];
  const currentSum = state.sum;
  if (newStateItems.some((el) => el.id === action.item.id)) {
    for (let item of newStateItems) {
      if (item.id === action.item.id)
        item.quantity = item.quantity + action.item.quantity;
    }
  } else newStateItems.push(action.item);

  const newTotalPrice =
    state.totalPrice + action.item.quantity * action.item.price;

  return {
    ...state,
    items: newStateItems,
    totalPrice: newTotalPrice,
    sum: currentSum + action.item.quantity
  };
};

const subtractFromCart = (state, action) => {
  const newStateItems = [...state.items];
  const currentSum = state.sum;
  for (let i = 0; i < newStateItems.length; i++) {
    const item = newStateItems[i];
    if (item.id === action.item.id) {
      item.quantity = item.quantity - 1;
    }
    if (item.quantity === 0) newStateItems.splice(i, 1);
  }

  const newTotalPrice = state.totalPrice - action.item.price;

  return {
    ...state,
    items: newStateItems,
    totalPrice: newTotalPrice,
    sum: currentSum - 1
  };
};

const purchaseStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  };
};
const purchaseSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    success: true,
    timestamp: action.timestamp
  };
};
const purchaseFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true
  };
};
const resetCart = (state, action) => {
  return initialState;
};

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  };
};
const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    orders: action.orders
  };
};
const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true
  };
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AddToCart:
      return AddToCart(state, action);
    case ActionTypes.subtractFromCart:
      return subtractFromCart(state, action);
    case ActionTypes.purchaseStart:
      return purchaseStart(state, action);
    case ActionTypes.purchaseSuccess:
      return purchaseSuccess(state, action);
    case ActionTypes.purchaseFail:
      return purchaseFail(state, action);
    case ActionTypes.resetCart:
      return resetCart(state, action);
    case ActionTypes.fetchOrdersStart:
      return fetchOrdersStart(state, action);
    case ActionTypes.fetchOrdersSuccess:
      return fetchOrdersSuccess(state, action);
    case ActionTypes.fetchOrdersFail:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};
