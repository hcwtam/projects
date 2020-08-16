import React, { useState } from 'react';

import { PostData, PostsData } from '../utils/posts';
import PostModal from '../components/shared/PostModal/PostModal';

export const usePostModal = (postsData: PostsData) => {
  const [currentPost, setCurrentPost] = useState<PostData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const showPost = (currentPost) => {
    setShowModal(true);
    setCurrentPost(currentPost);
  };

  const hidePost = () => {
    setShowModal(true);
    setCurrentPost(null);
  };

  const postModal = currentPost ? (
    <PostModal showModal={showModal} post={currentPost} hideModal={hidePost} />
  ) : null;

  return { showPost, postModal };
};
