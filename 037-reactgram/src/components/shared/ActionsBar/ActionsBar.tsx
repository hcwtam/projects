import React, { ReactElement, useState, useEffect } from 'react';

import styles from './ActionsBar.module.css';
import {
  HeartIcon,
  CommentIcon,
  InboxIcon,
  BookmarkIcon
} from '../../../assets/svg/icons';

interface Props {
  likePost?: () => void;
  unlikePost?: () => void;
  userId: string;
  likes: string[] | undefined;
  openModal?: () => void;
  focusInput?: () => void;
}

export default function ActionsBar({
  likePost,
  unlikePost,
  userId,
  likes,
  openModal,
  focusInput
}: Props): ReactElement {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const likeHandler = () => {
    if (isLiked) {
      unlikePost();
      setIsLiked(false);
    } else {
      likePost();
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (likes && likes.includes(userId)) setIsLiked(true);
    else setIsLiked(false);
  }, [likes, userId]);

  return (
    <section className={styles.ActionsBar}>
      <div onClick={likeHandler}>
        <HeartIcon isActive={isLiked} />
      </div>
      <div onClick={openModal || focusInput}>
        <CommentIcon />
      </div>
      {/* <div>
        <InboxIcon />
      </div> */}
      <div
        onClick={() => setIsBookmarked((prev) => !prev)}
        className={styles.BookmarkIcon}
      >
        <BookmarkIcon isActive={isBookmarked} />
      </div>
    </section>
  );
}
