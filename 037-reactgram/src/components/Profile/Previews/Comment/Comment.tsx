import React, { ReactElement, useState } from 'react';

import styles from './Comment.module.css';
import { TinyHeartIcon } from '../../../../assets/svg/icons';
import { calcTimeIntervalShorthand } from '../../../../utils/posts';

interface Props {
  avatarUrl: string;
  username: string;
  comment: string;
  time: string;
}

export default function Comment({
  avatarUrl,
  username,
  comment,
  time
}: Props): ReactElement {
  const [isLiked, setIsLiked] = useState(false);

  const commentTime = calcTimeIntervalShorthand(time);

  return (
    <div className={styles.Comment}>
      <div className={styles.Like} onClick={() => setIsLiked((prev) => !prev)}>
        {<TinyHeartIcon isActive={isLiked} />}
      </div>
      <div className={styles.Avatar}>
        <img src={avatarUrl} alt="avatar" />
      </div>

      <div className={styles.Content}>
        <h4>{username}</h4>
        <span>{comment}</span>
        <div className={styles.CommentTime}>{commentTime} </div>
      </div>
    </div>
  );
}
