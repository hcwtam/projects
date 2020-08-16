import React, { ReactElement } from 'react';
import useSWR from 'swr';

import styles from './Profile.module.css';
import Navbar from '../Navbar/Navbar';
import Header from './Header/Header';
import Previews from './Previews/Previews';
import { extractUserData } from '../../utils/auth';
import { extractPosts, PostData } from '../../utils/posts';
import { usePostModal } from '../../hooks/usePostModal';

interface Props {
  username: string;
}

export default function Profile({ username }: Props): ReactElement {
  const { data } = useSWR(
    `https://reactgram-ac3b0.firebaseio.com/users.json?orderBy="username"&equalTo="${username}"`
  );
  const [userData] = extractUserData(data);
  let avatarUrl, userId;
  if (userData) {
    avatarUrl = userData.avatarUrl;
    userId = userData.userId;
  }

  const { data: postsData } = useSWR(
    userId
      ? `https://reactgram-ac3b0.firebaseio.com/posts.json?orderBy=%22posterId%22&equalTo=%22${userId}%22`
      : null
  );

  const { showPost, postModal } = usePostModal(postsData);

  let posts = null;
  let postsCount = null;
  if (postsData) {
    posts = extractPosts(postsData)
      .sort((a, b) => b.time - a.time) // newest to oldest, need to sort since firebase filtered data is unsorted
      .map((currentPost: PostData) => (
        <div
          className={styles.Post}
          key={currentPost.postId}
          onClick={() => showPost(currentPost)}
        >
          <img src={currentPost.imageUrl} alt="preview" />
        </div>
      ));
    postsCount = posts.length;
  }

  return (
    <>
      <Navbar avatarUrl={avatarUrl} />
      <main className={styles.Profile}>
        <Header {...userData} postsCount={postsCount} />
        <Previews>{posts}</Previews>
      </main>
      {postModal}
    </>
  );
}
