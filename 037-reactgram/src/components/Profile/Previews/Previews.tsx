import React, { ReactElement } from 'react';

import styles from './Previews.module.css';
import { PostIcon, SavedIcon } from '../../../assets/svg/icons';
import { PostData } from '../../../utils/posts';

interface Props {
  posts: PostData[];
  showPosts: () => void;
  showSaved: () => void;
  savedIsActive: boolean;
  sameUser: boolean;
}

export default function Previews({
  posts,
  showPosts,
  showSaved,
  savedIsActive,
  sameUser
}: Props): ReactElement {
  return (
    <>
      <div className={styles.Banner}>
        <div
          className={`${styles.Types} ${!savedIsActive && styles.Active}`}
          onClick={showPosts}
        >
          <PostIcon />
          <div>Posts</div>
        </div>
        {sameUser && (
          <div
            className={`${styles.Types} ${savedIsActive && styles.Active}`}
            onClick={showSaved}
          >
            <SavedIcon />
            <div>Saved</div>
          </div>
        )}
      </div>
      <section className={styles.Previews}>{posts}</section>
    </>
  );
}
