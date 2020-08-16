import React, { ReactElement, useContext, useRef } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import styles from './PostModal.module.css';
import { CloseIcon, MoreIcon } from '../../../assets/svg/icons';
import ActionsBar from '../ActionsBar/ActionsBar';
import CommentInput from '../CommentSection/CommentInput/CommentInput';
import Comment from '../../Profile/Previews/Comment/Comment';
import { PostData, calcTimeInterval, formatLikes } from '../../../utils/posts';
import { userContext } from '../../../store/user';
import { useLikes } from '../../../hooks/useLikes';
import { useComments } from '../../../hooks/useComments';

interface Props {
  showModal: boolean;
  post: PostData;
  hideModal: () => void;
}

export default function PostModal({
  showModal,
  post,
  hideModal
}: Props): ReactElement {
  const { imageUrl, avatarUrl, posterName, time, caption } = post;
  const { userId } = useContext(userContext);
  const { localLikes, doubleClickToLike, likePost, unlikePost } = useLikes(
    post,
    userId
  );
  const { localComments, addComment } = useComments(post);
  const inputRef = useRef(null);

  const postTime = calcTimeInterval(time);
  let likesText = null;
  if (localLikes) likesText = formatLikes(localLikes.length);

  const replies = localComments
    ? localComments.map((comment) => (
        <Comment
          key={comment.time}
          avatarUrl={comment.avatarUrl}
          username={comment.username}
          comment={comment.comment}
          time={comment.time}
        />
      ))
    : null;

  return (
    <Modal
      open={showModal}
      onClose={hideModal}
      center
      showCloseIcon={false}
      animationDuration={0}
      classNames={{ overlay: styles.Overlay, modal: styles.PostModal }}
    >
      <div className={styles.CloseIcon} onClick={hideModal}>
        <CloseIcon />
      </div>
      <div className={styles.ImageContainer} onDoubleClick={doubleClickToLike}>
        <img src={imageUrl} alt="post" />
      </div>
      <div className={styles.CommentsContainer}>
        <div className={styles.Username}>
          <div className={styles.Avatar}>
            <img src={avatarUrl} alt="avatar" />
          </div>
          <div>{posterName}</div>
          <div className={styles.MoreIcon}>
            <MoreIcon />
          </div>
        </div>
        <div className={styles.Comments}>
          <Comment
            avatarUrl={avatarUrl}
            username={posterName}
            comment={caption}
            time={time}
          />
          {replies}
        </div>
        <ActionsBar
          likePost={likePost}
          unlikePost={unlikePost}
          userId={userId}
          likes={localLikes}
          focusInput={() => inputRef.current.focus()}
        />
        <div className={styles.Likes}>
          {localLikes && localLikes.length
            ? likesText
            : 'Be first to like this'}
        </div>
        <div className={styles.Time}>{postTime}</div>
        <CommentInput addComment={addComment} inputRef={inputRef} />
      </div>
    </Modal>
  );
}
