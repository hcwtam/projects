import React from 'react';

import styles from './Collection.module.css';
import Image from '../shared/Image/Image';

const Collection = ({ toGashapon, showHandler, store, images }) => {
  const Cards = [];

  const collectedChecker = (i) => !store.includes(i);

  for (let i = 0; i < 18; i++)
    Cards.push(
      <div
        key={i}
        id={i}
        onClick={() => {
          if (!store.includes(i)) showHandler(i);
        }}
        className={styles.card}
      >
        {collectedChecker(i) ? (
          <Image displayId={i} images={images} />
        ) : (
          <div
            style={{
              paddingTop: 16,
              fontSize: '2rem',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            ?
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className={styles.gashapon} onClick={toGashapon}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className={styles.Collection}>{Cards}</div>
    </>
  );
};

export default Collection;
