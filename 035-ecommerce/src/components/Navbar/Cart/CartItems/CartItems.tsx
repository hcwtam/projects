import React from 'react';
import { useSelector } from 'react-redux';

import styles from './CartItems.module.css';
import CartItem from './CartItem/CartItem';
import { RootState } from '../../../../reducers';

function CartItems() {
  const items = useSelector((state: RootState) => state.order.items);

  const cartItems = items.map((el) => (
    <CartItem
      key={el.id}
      name={el.name}
      imageURL={el.imageURL}
      quantity={el.quantity}
      id={el.id}
      price={el.price}
    />
  ));

  return <div className={styles.CartItems}>{cartItems}</div>;
}

export default CartItems;
