import React from 'react';

import styles from './Image.module.css';

const Image = ({ displayId, images }) => {
  const randomNumber = Math.floor(Math.random() * 5);
  let imageSource = images[`${displayId}.${displayId > 2 ? 'jpg' : 'gif'}`];

  if (isNaN(displayId)) imageSource = images[`${randomNumber + 18}.gif`];

  return <img className={styles.Image} src={imageSource} alt="me and ruru" />;
};

export default Image;
