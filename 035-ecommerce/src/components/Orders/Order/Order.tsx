import React from 'react';

import styles from './Order.module.css';

function Order({ summary }) {
  let summaryItems = null;
  let date = null;

  if (summary) {
    summaryItems = summary.items.map((el, i) => (
      <div className={styles.item} key={i}>
        <div className={styles.flexContainer}>
          <div className={styles.quantity}>
            <div>{el.quantity}</div>
            <i
              className="fa fa-times"
              aria-hidden="true"
              style={{ color: 'grey' }}
            />
            <div>{el.name[0].toUpperCase() + el.name.slice(1)}</div>
          </div>
          <div style={{ color: 'rgb(212, 163, 0)', fontWeight: 'bold' }}>{`$${(
            el.quantity * el.price
          ).toFixed(2)}`}</div>
        </div>
      </div>
    ));

    const timestamp = new Date(summary.timestamp);

    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
      timestamp
    );
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(
      timestamp
    );
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
      timestamp
    );
    date = `${da} ${mo} ${ye}`;
  }
  return (
    summary && (
      <div className={styles.Order}>
        <h2>Order summary</h2>
        <div style={{ textAlign: 'right' }}>
          Order placed:{' '}
          <h4 style={{ display: 'inline-block', marginLeft: 5 }}>{date}</h4>
        </div>
        {summaryItems}
        <div className={styles.flexContainer}>
          <h4>Total:</h4> <h3>{`$${summary.totalPrice.toFixed(2)}`}</h3>
        </div>
      </div>
    )
  );
}

export default Order;
