import React, { ReactElement, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Post.module.css';
import ProfilePicture from '../../../shared/ProfilePicture/ProfilePicture';
import { MoreIcon } from '../../../../assets/svg/icons';
import ActionsBar from '../../../shared/ActionsBar/ActionsBar';
import CommentSection from '../../../shared/CommentSection/CommentSection';
import { userContext } from '../../../../store/user';
import { useLikes } from '../../../../hooks/useLikes';

interface Props {
  caption: string;
  comments: any[] | undefined;
  likes: string[];
  postId: string;
  posterName: string;
  avatarUrl: string;
  time: string;
  imageUrl: string;
  showPost: (currentpost: any) => void;
}

export default function Post(post: Props): ReactElement {
  const history = useHistory();

  const {
    caption,
    comments,
    likes,
    postId,
    posterName,
    avatarUrl,
    time,
    imageUrl,
    showPost
  } = post;
  const { userId } = useContext(userContext);
  const { localLikes, doubleClickToLike, likePost, unlikePost } = useLikes(
    post,
    userId
  );

  const openModal = () => {
    showPost(post);
  };

  return (
    <article className={styles.Post}>
      <header>
        <div onClick={() => history.push(`/${posterName}`)}>
          <ProfilePicture
            avatarUrl={avatarUrl}
            style={{ width: 32, height: 32 }}
          />
        </div>
        <div
          style={{ paddingLeft: 20, cursor: 'pointer' }}
          onClick={() => history.push(`/${posterName}`)}
        >
          {posterName}
        </div>
        <div className={styles.MoreIcon}>
          <MoreIcon />
        </div>
      </header>
      <div className={styles.ImageContainer} onDoubleClick={doubleClickToLike}>
        <img src={imageUrl} alt="content" />
      </div>
      <ActionsBar
        likePost={likePost}
        unlikePost={unlikePost}
        userId={userId}
        likes={localLikes}
        openModal={openModal}
      />
      <CommentSection post={post} likes={localLikes} />
    </article>
  );
}
