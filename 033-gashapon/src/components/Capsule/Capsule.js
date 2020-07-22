import React from 'react';

import styles from './Capsule.module.css';
import Card from './Card/Card';

const Capsule = ({ close, displayId, images, delay }) => {
  return (
    <div className={`${styles.Capsule} ${delay}`}>
      <Card images={images} displayId={displayId} close={close} />
    </div>
  );
};

export default Capsule;
