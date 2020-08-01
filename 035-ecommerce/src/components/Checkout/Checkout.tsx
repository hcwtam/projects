import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CardElement } from '@stripe/react-stripe-js';

import styles from './Checkout.module.css';
import Navbar from '../Navbar/Navbar';
import CheckoutItem from './CheckoutItem/CheckoutItem';
import DeliveryForm from '../forms/DeliveryForm';
import { RootState } from '../../reducers';
import { purchase } from '../../actions';

function Checkout() {
  const [submitted, setSubmitted] = useState(false);
  const items = useSelector((state: RootState) => state.order.items);
  const details = useSelector((state: RootState) => state.auth.details);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);
  const error = useSelector((state: RootState) => state.order.error);
  const loading = useSelector((state: RootState) => state.order.loading);
  const success = useSelector((state: RootState) => state.order.success);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (totalPrice === 0) history.push('/shop');
    if (success) history.push('/success');
  }, [totalPrice, success, history]);

  const paymentHandler = () => {
    const timestamp = new Date();

    dispatch(purchase(items, details, totalPrice, userId, timestamp));
  };

  const checkoutItems = items.map((el) => (
    <CheckoutItem
      key={el.id}
      name={el.name}
      imageURL={el.imageURL}
      quantity={el.quantity}
      id={el.id}
      price={el.price}
    />
  ));

  const cardElementOptions = {
    hidePostalCode: true
  };

  return (
    <div className={styles.Checkout}>
      <Navbar />
      <div className={styles.itemsContainer}>
        <h4>Your order</h4>
        {checkoutItems}
      </div>
      <div className={styles.break} />
      <div className={styles.form}>
        {submitted ? (
          <>
            <div className={styles.container}>
              <h4>Your details</h4>
              <div className={styles.detailContainer}>
                <div>
                  <h5>Full name</h5>
                  <div>{details.fullName}</div>
                </div>
                <div>
                  <h5>Contact number</h5>

                  <div>{details.contactNumber}</div>
                </div>
              </div>
              <h5>Delivery address</h5>
              <div>{`${details.street1}, ${details.street2}, ${details.city}`}</div>
            </div>
            <div className={styles.container}>
              <h4>Total</h4>
              <h5>Item(s) price</h5>
              <div>{`$${totalPrice.toFixed(2)}`}</div>
            </div>
            <div className={styles.stripeContainer}>
              <CardElement options={cardElementOptions} />
            </div>
            <button disabled={loading} onClick={paymentHandler}>
              Place order
            </button>
            {error && (
              <div style={{ margin: 10, color: 'red' }}>Please try again.</div>
            )}
          </>
        ) : (
          <DeliveryForm submitted={() => setSubmitted(true)} />
        )}
      </div>
    </div>
  );
}

export default Checkout;
