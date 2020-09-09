import axios from 'axios';

export interface PostsData {
  [key: string]: PostData;
}

export interface PostData {
  avatarUrl: string;
  caption: string;
  comments: any[] | undefined;
  likes: string[];
  postId: string;
  posterName: string;
  time: string;
  imageUrl: string;
}

export const putNewLikes = (
  postId: string,
  post: PostData,
  likes: string[]
) => {
  axios.put(`https://reactgram-ac3b0.firebaseio.com/posts/${postId}.json`, {
    ...post,
    likes
  });
};

export const pushIdToLikes = (likes: string[], userId: string) => {
  let likesArray: string[] = [userId];
  if (likes) {
    likesArray = [...likes, userId];
  }
  return likesArray;
};

export const pullIdFromLikes = (likes: string[], userId: string) => {
  const likesArray: string[] = likes.filter((id) => id !== userId);
  return likesArray;
};

export const formatLikes = (likes: number) => {
  switch (true) {
    case likes === 1:
      return '1 like';
    case likes > 1:
      return `${likes} likes`;
    default:
      return null;
  }
};

export const uploadPost = async (values) => {
  axios
    .post(`https://reactgram-ac3b0.firebaseio.com/posts.json`, values)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
    });
};

export const extractPosts = (r: PostsData) => {
  let posts = [];
  for (let key in r) {
    posts.push({ ...r[key], postId: key });
  }

  return posts;
};

export const calcTimeInterval = (timestamp: string) => {
  const timeDiffInHours =
    (Date.now() - new Date(timestamp).getTime()) / 1000 / 60 / 60;
  switch (true) {
    case timeDiffInHours * 60 < 1:
      return `1 minute ago`;
    case timeDiffInHours < 1:
      const timeDiffInMinutes = Math.ceil(timeDiffInHours * 60);
      return `${timeDiffInMinutes} minutes ago`;
    case timeDiffInHours < 2 && timeDiffInHours > 1:
      return `1 hour ago`;
    case timeDiffInHours < 24:
      const roundedHours = Math.floor(timeDiffInHours);
      return `${roundedHours} hours ago`;
    case timeDiffInHours < 48 && timeDiffInHours > 24:
      return `1 day ago`;
    case timeDiffInHours <= 96:
      const roundedDays = Math.floor(timeDiffInHours / 24);
      return `${roundedDays} days ago`;
    case timeDiffInHours > 96:
      const day = new Date(timestamp).toString().split(' ')[2];
      const month = new Date(timestamp).toString().split(' ')[1];
      return `${day} ${month}`;
    default:
      throw new Error();
  }
};
export const calcTimeIntervalShorthand = (timestamp: string) => {
  const timeDiffInHours =
    (Date.now() - new Date(timestamp).getTime()) / 1000 / 60 / 60;
  switch (true) {
    case timeDiffInHours * 60 < 1:
      return `now`;
    case timeDiffInHours < 1:
      const timeDiffInMinutes = Math.ceil(timeDiffInHours * 60);
      return `${timeDiffInMinutes}m`;
    case timeDiffInHours < 24:
      const roundedHours = Math.floor(timeDiffInHours);
      return `${roundedHours}h ago`;
    case timeDiffInHours >= 24:
      const day = Math.floor(timeDiffInHours / 24);
      return `${day}d`;
    default:
      throw new Error();
  }
};
