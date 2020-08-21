import { useContext } from 'react';
import axios from 'axios';

import { userContext } from '../store/user';
import { PostData } from '../utils/posts';
import { UserData } from '../utils/auth';

const pushIdToBookmarks = (bookmarks: string[], postId: string) => {
  let bookmarksArray: string[] = [postId];
  if (bookmarks) {
    bookmarksArray = [...bookmarks, postId];
  }
  return bookmarksArray;
};

const pullIdFromBookmarks = (bookmarks: string[], postId: string) => {
  const bookmarksArray: string[] = bookmarks.filter((id) => id !== postId);
  return bookmarksArray;
};

const putNewBookmarks = (uid: string, user: UserData, bookmarks: string[]) => {
  console.log(user);

  axios.put(`https://reactgram-ac3b0.firebaseio.com/users/${uid}.json`, {
    ...user,
    bookmarks: bookmarks
  });
};

export const useBookmark = (post: PostData) => {
  const { postId } = post;
  const { localBookmarks, setLocalBookmarks, ...user } = useContext(
    userContext
  );
  const { uid } = user;

  const bookmarkPost = () => {
    const bookmarksArray = pushIdToBookmarks(localBookmarks, postId);
    setLocalBookmarks(bookmarksArray);
    putNewBookmarks(uid, user, bookmarksArray);
  };

  const unmarkPost = () => {
    const bookmarksArray = pullIdFromBookmarks(localBookmarks, postId);
    setLocalBookmarks(bookmarksArray);
    putNewBookmarks(uid, user, bookmarksArray);
  };

  return { localBookmarks, bookmarkPost, unmarkPost };
};
