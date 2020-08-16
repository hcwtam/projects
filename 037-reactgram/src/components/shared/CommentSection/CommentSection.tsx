import React, { ReactElement } from 'react';

import styles from './CommentSection.module.css';
import CommentInput from './CommentInput/CommentInput';
import { calcTimeInterval, formatLikes, PostData } from '../../../utils/posts';
import { useComments } from '../../../hooks/useComments';

interface Props {
  post: PostData;
  likes: string[] | undefined;
}

export default function CommentSection({ post, likes }: Props): ReactElement {
  const { caption, posterName, time } = post;
  const { localComments, addComment } = useComments(post);

  const postTime = calcTimeInterval(time);
  let likesText = null;
  if (likes) likesText = formatLikes(likes.length);

  const firstReply =
    localComments && localComments[0] ? (
      <div className={styles.Comment}>
        <div className={styles.User}>{localComments[0].username}</div>
        <div>{localComments[0].comment}</div>
      </div>
    ) : null;
  const secondReply =
    localComments && localComments[1] ? (
      <div className={styles.Comment}>
        <div className={styles.User}>{localComments[1].username}</div>
        <div>{localComments[1].comment}</div>
      </div>
    ) : null;
  const viewAll =
    localComments && localComments[2] ? (
      <a className={styles.ViewAll} href="/zs">
        {`View all ${localComments.length} comments`}
      </a>
    ) : null;

  return (
    <>
      <section className={styles.CommentSection}>
        <div className={styles.Likes}>
          {likes && likes.length ? likesText : 'Be first to like this'}
        </div>
        <div className={styles.Comment}>
          <div className={styles.User}>{posterName}</div>
          <div>{caption}</div>
        </div>
        {viewAll}
        {firstReply}
        {secondReply}
        <div className={styles.Time}> {postTime}</div>
      </section>
      <div className={styles.AddComment}>
        <CommentInput addComment={addComment} />
      </div>
    </>
  );
}
