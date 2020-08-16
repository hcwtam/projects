import { useState } from 'react';

import {
  putNewLikes,
  pullIdFromLikes,
  pushIdToLikes,
  PostData
} from '../utils/posts';

export const useLikes = (post: PostData, userId: string) => {
  const { likes, postId } = post;

  const [localLikes, setLocalLikes] = useState(likes);

  const doubleClickToLike = () => {
    if (localLikes && localLikes.includes(userId)) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const likePost = () => {
    const likesArray = pushIdToLikes(localLikes, userId);
    setLocalLikes(likesArray);
    putNewLikes(postId, post, likesArray);
  };

  const unlikePost = () => {
    const likesArray = pullIdFromLikes(localLikes, userId);
    setLocalLikes(likesArray);
    putNewLikes(postId, post, likesArray);
  };

  return { localLikes, doubleClickToLike, likePost, unlikePost };
};
