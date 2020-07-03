import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCtKclEfn2s_7z3tzu7I6nqeY-zQ4hETfU",
  authDomain: "battlespaceships-c4a30.firebaseapp.com",
  databaseURL: "https://battlespaceships-c4a30.firebaseio.com",
  projectId: "battlespaceships-c4a30",
  storageBucket: "battlespaceships-c4a30.appspot.com",
  messagingSenderId: "1094021722652",
  appId: "1:1094021722652:web:a77ed0f6aa4b22995865d9",
  measurementId: "G-MQ4W8P3ZK1",
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
