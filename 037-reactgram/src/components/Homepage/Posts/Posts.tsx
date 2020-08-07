import React, { ReactElement } from 'react';

import styles from './Posts.module.css';
import Post from './Post/Post';

interface Props {}

export default function Posts({}: Props): ReactElement {
  return (
    <section className={styles.Posts}>
      <Post />
      <Post />
      <Post />
    </section>
  );
}
