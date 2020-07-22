import React from 'react';

import styles from './Card.module.css';
import Image from '../../shared/Image/Image';
import { messages } from '../../../assets/messages';

const Card = ({ close, displayId, images }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.photoContainer}>
        <Image images={images} displayId={displayId} />
      </div>
      <div className={styles.message}>{messages[displayId]}</div>
      <div className={`${styles.x1} ${styles.heart}`} />
      <div className={`${styles.x2} ${styles.heart}`} />
      <div className={`${styles.x3} ${styles.heart}`} />
      <div className={`${styles.x4} ${styles.heart}`} />
      <div className={`${styles.x5} ${styles.heart}`} />
      <div className={`${styles.x6} ${styles.heart}`} />
      <button onClick={close}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default Card;
