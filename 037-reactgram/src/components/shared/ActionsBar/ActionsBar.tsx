import React, { ReactElement, useState, useEffect } from 'react';

import styles from './ActionsBar.module.css';
import {
  HeartIcon,
  CommentIcon,
  InboxIcon,
  BookmarkIcon
} from '../../../assets/svg/icons';

interface Props {
  likes: string[] | undefined;
  likePost?: () => void;
  unlikePost?: () => void;
  userId: string;
  openModal?: () => void;
  focusInput?: () => void;
  bookmarks: string[] | undefined;
  bookmarkPost?: () => void;
  unmarkPost?: () => void;
  postId: string;
}

export default function ActionsBar({
  likes,
  likePost,
  unlikePost,
  userId,
  openModal,
  focusInput,
  bookmarks,
  postId,
  bookmarkPost,
  unmarkPost
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

  const bookmarkHandler = () => {
    if (isBookmarked) {
      unmarkPost();
      setIsBookmarked(false);
    } else {
      bookmarkPost();
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (likes && likes.includes(userId)) setIsLiked(true);
    else setIsLiked(false);
  }, [likes, userId]);

  useEffect(() => {
    if (bookmarks && bookmarks.includes(postId)) setIsBookmarked(true);
    else setIsBookmarked(false);
  }, [bookmarks, postId]);

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
      <div onClick={bookmarkHandler} className={styles.BookmarkIcon}>
        <BookmarkIcon isActive={isBookmarked} />
      </div>
    </section>
  );
}
