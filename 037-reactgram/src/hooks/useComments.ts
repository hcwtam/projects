import { useState, useContext } from 'react';
import axios from 'axios';

import { PostData } from '../utils/posts';
import { userContext } from '../store/user';

export const useComments = (post: PostData) => {
  const { comments, postId } = post;
  const { username, avatarUrl } = useContext(userContext);

  const [localComments, setLocalComments] = useState(comments || []);

  const addComment = (input) => {
    const newComments = [
      ...localComments,
      { ...input, username, avatarUrl, time: Date.now() }
    ];
    setLocalComments(newComments);
    axios.put(`https://reactgram-ac3b0.firebaseio.com/posts/${postId}.json`, {
      ...post,
      comments: newComments
    });
  };

  return { localComments, addComment };
};
