import React, { ReactElement } from 'react';

import styles from './Previews.module.css';
import { PostIcon } from '../../../assets/svg/icons';

interface Props {
  children: ReactElement;
}

export default function Previews({ children }: Props): ReactElement {
  return (
    <>
      <div className={styles.Banner}>
        <div className={styles.Posts}>
          <PostIcon />
          <div>Posts</div>
        </div>
      </div>
      <section className={styles.Previews}>{children}</section>
      {/* {postModal} */}
    </>
  );
}
