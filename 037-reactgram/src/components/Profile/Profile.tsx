import React, { ReactElement, useState, useContext } from 'react';
import useSWR from 'swr';

import styles from './Profile.module.css';
import Navbar from '../Navbar/Navbar';
import Header from './Header/Header';
import Previews from './Previews/Previews';
import { extractUserData } from '../../utils/auth';
import { extractPosts, PostData } from '../../utils/posts';
import { usePostModal } from '../../hooks/usePostModal';
import { useLocation } from 'react-router-dom';
import { userContext } from '../../store/user';

interface Props {
  username: string;
}

interface LocationState {
  initToSaved?: boolean;
}

export default function Profile({ username }: Props): ReactElement {
  const { avatarUrl, userId } = useContext(userContext);
  const location = useLocation<LocationState>();
  const { state } = location;
  let initToSaved;
  if (state) initToSaved = state.initToSaved;
  const [showSaved, setShowSaved] = useState(initToSaved || false);

  const { data } = useSWR(
    `https://reactgram-ac3b0.firebaseio.com/users.json?orderBy="username"&equalTo="${username}"`
  );
  const [currentUserData] = extractUserData(data);
  let currentUserId, bookmarks, sameUser;
  if (currentUserData) {
    currentUserId = currentUserData.userId;
    bookmarks = currentUserData.bookmarks;
    sameUser = currentUserId === userId;
  }

  const { data: postsData } = useSWR(
    currentUserId ? `https://reactgram-ac3b0.firebaseio.com/posts.json` : null
  );

  const { showPost, postModal } = usePostModal(postsData);

  let posts = null;
  let postsCount = null;
  if (postsData) {
    posts = extractPosts(postsData)
      .filter((post) =>
        showSaved
          ? bookmarks
            ? bookmarks.includes(post.postId)
            : !post
          : post.posterId === currentUserId
      )
      .sort((a, b) => b.time - a.time)
      .map((currentPost: PostData) => (
        <div
          className={styles.Post}
          key={currentPost.postId}
          onClick={() => showPost(currentPost)}
        >
          <img src={currentPost.imageUrl} alt="preview" />
        </div>
      ));

    postsCount = extractPosts(postsData).filter(
      (post) => post.posterId === currentUserId
    ).length;
  }

  return (
    <>
      <Navbar avatarUrl={avatarUrl} />
      <main className={styles.Profile}>
        <Header
          currentUserData={currentUserData}
          postsCount={postsCount}
          sameUser={sameUser}
        />
        <Previews
          posts={posts}
          showPosts={() => setShowSaved(false)}
          showSaved={() => setShowSaved(true)}
          savedIsActive={showSaved}
          sameUser={sameUser}
        />
      </main>
      {postModal}
    </>
  );
}
