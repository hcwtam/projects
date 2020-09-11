import React from 'react';
import { useDispatch } from 'react-redux';

import { useImage } from '../../../hooks/useImage';
import styles from './CheckoutItem.module.css';
import { addToCart, subtractFromCart } from '../../../actions';

function CheckoutItem(props) {
  const { id, name, price, imageURL, quantity } = props;
  const url = useImage(imageURL);
  const dispatch = useDispatch();

  return (
    <div className={styles.CheckoutItem}>
      <div className={styles.description}>
        <div className={styles.imageContainer}>
          {url ? <img src={url} alt={name} /> : null}
        </div>
        <div>
          <strong>{name[0].toUpperCase() + name.slice(1)}</strong>
          <div>{`$${(price * quantity).toFixed(2)}`}</div>
        </div>
      </div>
      <div className={styles.counterContainer}>
        <button onClick={() => dispatch(subtractFromCart(id, price))}>−</button>
        <div>{quantity}</div>
        <button onClick={() => dispatch(addToCart({ quantity: 1 }, props))}>
          +
        </button>
      </div>
    </div>
  );
}

export default CheckoutItem;
