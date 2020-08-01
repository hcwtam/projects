import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import axios from 'axios';

export const addToCart = (quantity, item) => {
  const { id, name, price, imageURL } = item;

  return {
    type: ActionTypes.AddToCart,
    item: {
      ...quantity,
      id,
      name,
      price,
      imageURL
    }
  };
};

export const subtractFromCart = (id, price) => {
  return {
    type: ActionTypes.subtractFromCart,
    item: {
      id,
      price
    }
  };
};

export const purchaseStart = () => {
  return {
    type: ActionTypes.purchaseStart
  };
};

export const purchaseSuccess = (timestamp) => {
  return {
    type: ActionTypes.purchaseSuccess,
    timestamp
  };
};

export const purchaseFail = () => {
  return {
    type: ActionTypes.purchaseFail
  };
};

export const purchase = (
  items,
  details,
  totalPrice,
  userId = 'Anon',
  timestamp
) => {
  return (dispatch: Dispatch) => {
    dispatch(purchaseStart());

    let url = `https://ecommerce-5bec3.firebaseio.com/orders.json`;
    axios
      .post(url, { items, details, totalPrice, userId, timestamp })
      .then((res) => {
        console.log(res.data);
        dispatch(purchaseSuccess(timestamp));
      })
      .catch((err) => {
        dispatch(purchaseFail());
      });
  };
};

export const resetCart = () => {
  return {
    type: ActionTypes.resetCart
  };
};

export const fetchOrdersStart = () => {
  return {
    type: ActionTypes.fetchOrdersStart
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: ActionTypes.fetchOrdersSuccess,
    orders
  };
};

export const fetchOrdersFail = () => {
  return {
    type: ActionTypes.fetchOrdersFail
  };
};

export const fetchOrders = (userId) => {
  return (dispatch: Dispatch) => {
    let url = `https://ecommerce-5bec3.firebaseio.com/orders.json?orderBy=%22userId%22&equalTo=%22${userId}%22`;
    axios
      .get(url)
      .then((res) => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key]
          });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail());
      });
  };
};
