import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import styles from './Success.module.css';
import Navbar from '../Navbar/Navbar';
import { RootState } from '../../reducers';
import { resetCart } from '../../actions';
import Order from '../Orders/Order/Order';

function Success() {
  const [summary, setSummary] = useState(null);
  const success = useSelector((state: RootState) => state.order.success);
  const items = useSelector((state: RootState) => state.order.items);
  const timestamp = useSelector((state: RootState) => state.order.timestamp);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [localSuccess] = useState(success);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!localSuccess) history.push('/shop');
  }, [localSuccess, history]);

  useEffect(() => {
    if (!summary) {
      setSummary({ items, timestamp, totalPrice });
      dispatch(resetCart());
    }
  }, [summary, items, timestamp, totalPrice, dispatch]);

  return (
    <div className={styles.Success}>
      <Navbar />
      <h1>Thank you for your purchase!</h1>
      <Order summary={summary} />
      <div className={styles.links}>
        {userId && (
          <Link to="/orders">
            <button>View order history</button>
          </Link>
        )}
        <Link to="/shop">
          <button>Return to shop</button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
