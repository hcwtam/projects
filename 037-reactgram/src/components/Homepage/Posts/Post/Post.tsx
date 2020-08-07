import React, { ReactElement } from 'react';

import styles from './Post.module.css';

interface Props {}

export default function Post({}: Props): ReactElement {
  return <article className={styles.Post}></article>;
}
