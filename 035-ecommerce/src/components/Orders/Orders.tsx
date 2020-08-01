import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../reducers';
import { fetchOrders } from '../../actions';
import Order from './Order/Order';
import styles from './Orders.module.css';
import Navbar from '../Navbar/Navbar';

function Orders() {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.userId);
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    if (!orders) dispatch(fetchOrders(userId));
  }, [dispatch, userId, orders]);

  let orderSummaries = null;
  if (orders)
    orderSummaries = orders.map((summary) => (
      <Order key={summary.timestamp} summary={summary} />
    ));

  return (
    <div className={styles.Orders}>
      <Navbar />
      <h1>Order history</h1>
      {orderSummaries}
    </div>
  );
}

export default Orders;
