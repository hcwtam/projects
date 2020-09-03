import React, { ReactElement, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Post.module.css';
import ProfilePicture from '../../../shared/ProfilePicture/ProfilePicture';
import ActionsBar from '../../../shared/ActionsBar/ActionsBar';
import CommentSection from '../../../shared/CommentSection/CommentSection';
import { userContext } from '../../../../store/user';
import { useLikes } from '../../../../hooks/useLikes';
import { useBookmark } from '../../../../hooks/useBookmark';

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

  const { postId, posterName, avatarUrl, imageUrl, showPost } = post;

  const { userId } = useContext(userContext);
  const { localLikes, doubleClickToLike, likePost, unlikePost } = useLikes(
    post,
    userId
  );
  const { localBookmarks, bookmarkPost, unmarkPost } = useBookmark(post);

  const openModal = () => {
    showPost(post);
  };

  return (
    <div className={styles.PostWrapper}>
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
        </header>
        <div
          className={styles.ImageContainer}
          onDoubleClick={doubleClickToLike}
        >
          <img src={imageUrl} alt="content" />
        </div>
        <ActionsBar
          likes={localLikes}
          likePost={likePost}
          unlikePost={unlikePost}
          userId={userId}
          openModal={openModal}
          bookmarks={localBookmarks}
          bookmarkPost={bookmarkPost}
          unmarkPost={unmarkPost}
          postId={postId}
        />
        <CommentSection post={post} likes={localLikes} openModal={openModal} />
      </article>
    </div>
  );
}
