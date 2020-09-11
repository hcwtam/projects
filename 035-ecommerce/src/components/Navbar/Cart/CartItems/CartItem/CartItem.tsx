import React from 'react';
import Tippy from '@tippyjs/react';
import { useDispatch } from 'react-redux';

import { useImage } from '../../../../../hooks/useImage';
import { addToCart, subtractFromCart } from '../../../../../actions';
import styles from './CartItem.module.css';
import 'tippy.js/dist/tippy.css';

function CartItem(props) {
  const { id, name, price, imageURL, quantity } = props;
  const url = useImage(imageURL);

  const dispatch = useDispatch();

  return (
    <Tippy content={name[0].toUpperCase() + name.slice(1)}>
      <div className={styles.CartItem}>
        <div className={styles.imageContainer}>
          {url ? <img src={url} alt={name} /> : null}
        </div>
        <div>
          <button onClick={() => dispatch(subtractFromCart(id, price))}>
            −
          </button>
          <button onClick={() => dispatch(addToCart({ quantity: 1 }, props))}>
            +
          </button>
        </div>
        <div className={styles.counter}>{quantity}</div>
      </div>
    </Tippy>
  );
}

export default CartItem;
