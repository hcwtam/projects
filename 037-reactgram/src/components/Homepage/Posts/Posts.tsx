import React, { ReactElement, useContext } from 'react';
import useSWR from 'swr';

import styles from './Posts.module.css';
import Post from './Post/Post';
import { extractPosts, PostData } from '../../../utils/posts';
import { userContext } from '../../../store/user';
import { usePostModal } from '../../../hooks/usePostModal';

interface Props {}

export default function Posts({}: Props): ReactElement {
  const { data } = useSWR('https://reactgram-ac3b0.firebaseio.com/posts.json');
  const { userId } = useContext(userContext);
  const { showPost, postModal } = usePostModal(data);

  let posts = null;

  if (data) {
    posts = extractPosts(data)
      .reverse()
      .filter((post) => post.posterId !== userId)
      .map((post: PostData) => (
        <Post key={post.postId} {...post} showPost={showPost} />
      ));
  }

  return (
    <section className={styles.Posts}>
      {posts}
      {postModal}
    </section>
  );
}
