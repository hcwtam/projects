import React, { ReactElement, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import styles from './Header.module.css';
import { OptionsIcon } from '../../../assets/svg/icons';
import { Link } from 'react-router-dom';
import { userContext } from '../../../store/user';
import { UserData } from '../../../utils/auth';

interface Props {
  currentUserData: UserData;
  postsCount: number;
  sameUser: boolean;
}

export default function Header({
  currentUserData,
  postsCount,
  sameUser
}: Props): ReactElement {
  const {
    avatarUrl,
    bio,
    fullName,
    username,
    userId,
    website,
    followers,
    following,
    uid
  } = currentUserData || {};
  const user = useContext(userContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user.following && user.following.includes(userId)) setIsFollowing(true);
  }, [user.following, userId]);

  const follow = () => {
    setIsFollowing(true);
    let followingList = [userId];
    if (user.following) followingList = [...user.following, userId];
    let followersList = [user.userId];
    if (followers) followersList = [...followers, user.userId];
    putFollow(followingList, followersList);
  };

  const unfollow = () => {
    setIsFollowing(false);
    let followingList = [];
    if (user.following)
      followingList = [...user.following].filter((id) => id !== userId);
    let followersList = [];
    if (followers)
      followersList = [...followers].filter((id) => id !== user.userId);
    putFollow(followingList, followersList);
  };

  const putFollow = (followingList: string[], followersList: string[]) => {
    axios.put(`https://reactgram-ac3b0.firebaseio.com/users/${user.uid}.json`, {
      ...user,
      following: followingList
    });
    axios.put(`https://reactgram-ac3b0.firebaseio.com/users/${uid}.json`, {
      ...currentUserData,
      followers: followersList
    });
  };

  const userButton = sameUser ? (
    <>
      <Link to="/settings">Edit Profile</Link>
      <OptionsIcon />
    </>
  ) : isFollowing ? (
    <button onClick={unfollow}>Following</button>
  ) : (
    <button
      onClick={follow}
      style={{ backgroundColor: '#0095f6', color: 'white' }}
    >
      Follow
    </button>
  );

  const followersCount = followers ? followers.length : 0;
  const followingsCount = following ? following.length : 0;

  return (
    <header className={styles.Header}>
      <div className={styles.Avatar}>
        <img src={avatarUrl} alt="avatar" />
      </div>
      <div className={styles.Info}>
        <div className={styles.Username}>
          <h1>{username}</h1>
          {userButton}
        </div>
        <div className={styles.Stats}>
          <div>
            <strong>{postsCount} </strong>posts
          </div>
          <div>
            <strong>{followersCount} </strong>followers
          </div>
          <div>
            <strong>{followingsCount} </strong>following
          </div>
        </div>
        <div className={styles.AboutMe}>
          {fullName && <div className={styles.Name}>{fullName}</div>}
          {bio && <div className={styles.Bio}>{bio}</div>}
          {website && (
            <a className={styles.Website} href={website}>
              {website}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
