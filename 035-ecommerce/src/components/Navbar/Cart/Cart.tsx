import React, { useState } from 'react';
import Rodal from 'rodal';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import 'rodal/lib/rodal.css';
import styles from './Cart.module.css';
import CartItems from './CartItems/CartItems';
import { RootState } from '../../../reducers';

function Cart() {
  const [openModal, setOpenModal] = useState(false);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);
  const items = useSelector((state: RootState) => state.order.items);
  const sum = useSelector((state: RootState) => state.order.sum);

  const history = useHistory();

  const modalStyles = {
    height: '100vh',
    width: 350,
    top: 0,
    right: 0,
    margin: 0,
    padding: 0,
    inset: '0 calc(100% - 300px)',
    borderRadius: 0,
    textAlign: 'left',
    overflowY: 'scroll'
  };

  const cart = (
    <div className={styles.Cart}>
      <div className={styles.summary}>
        <h5>My cart</h5>
        <div className={styles.break} />
        <div className={styles.data}>
          <div>Total</div>
          <div>{`$${totalPrice.toFixed(2)}`}</div>
        </div>
        <button
          disabled={!items.length}
          onClick={() => history.push('/checkout')}
        >
          Checkout
        </button>
      </div>
      <div className={styles.items}>
        <CartItems />
      </div>
    </div>
  );

  return (
    <>
      <i
        className="fa fa-shopping-basket"
        aria-hidden="true"
        onClick={() => setOpenModal(true)}
        style={{ fontSize: 24 }}
      />
      {sum > 0 && (
        <div className={styles.count} onClick={() => setOpenModal(true)}>
          {sum}
        </div>
      )}
      <Rodal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        customStyles={modalStyles}
        animation="slideRight"
      >
        {cart}
      </Rodal>
    </>
  );
}

export default Cart;
