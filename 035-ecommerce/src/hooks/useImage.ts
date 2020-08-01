import { useState, useEffect, useRef } from 'react';

import firebase from '../firebase/firebaseIndex';

const storage = firebase.storage();

export function useImage(imageURL) {
  const [url, setUrl] = useState('');
  const isCancelled = useRef(false);

  useEffect(() => {
    storage
      .ref(imageURL)
      .getDownloadURL()
      .then((URL) => {
        if (!isCancelled.current) setUrl(URL);
      });
    return () => {
      isCancelled.current = true;
    };
  }, [imageURL]);

  return url;
}
