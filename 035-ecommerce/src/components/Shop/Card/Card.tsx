import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useImage } from '../../../hooks/useImage';
import styles from './Card.module.css';
import Quantity from '../../forms/Quantity';

function Card(props) {
  const { id, name, shortDescription, price, imageURL } = props;
  const url = useImage(imageURL);
  const [border, setBorder] = useState(false);
  const history = useHistory();

  const addedNotifier = () => {
    setBorder(true);
    setTimeout(() => setBorder(false), 1000);
  };

  return (
    <div
      className={`${styles.Card} ${border ? styles.border : null}`}
      onClick={() => history.push(`/product/${id}`, props)}
    >
      <div className={styles.imageContainer}>
        {url ? <img src={url} alt={name} /> : null}
      </div>
      <div className={styles.name}>{name[0].toUpperCase() + name.slice(1)}</div>
      <div>{shortDescription}</div>
      <div className={styles.bottom}>
        <span className={styles.price}>{`$${price.toFixed(2)}`}</span>
        <Quantity {...props} notify={addedNotifier} />
      </div>
    </div>
  );
}

export default Card;
