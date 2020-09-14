import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import db from '../firebase';
import { AlertContext } from './AlertContext';

export const PostsContext = createContext();

const PostsContextProivder = (props) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [loading, setLoading] = useState(false);

  const postsRef = db.collection('posts');
  const postsRefLimit = db.collection('posts').limit(1);

  const { setAlert } = useContext(AlertContext);

  const getPosts = async () => {
    await postsRefLimit
      .get()
      .then((snapshots) => {
        setLastVisible(snapshots.docs[snapshots.docs.length - 1]);
        const firestorePosts = snapshots.docs.map((doc) => doc.data());
        setPosts(firestorePosts);
      })
      .catch((err) => {
        setAlert('danger', err.message);
      });
  };

  const fetchMorePosts = async () => {
    setLoading(true);
    await postsRef
      .startAfter(lastVisible)
      .limit(1)
      .get()
      .then((snapshots) => {
        setLastVisible(snapshots.docs[snapshots.docs.length - 1]);
        const firestorePosts = snapshots.docs.map((doc) => doc.data());
        setPosts(posts.concat(firestorePosts));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlert('danger', err.message);
      });
  };

  // const createPost = (title, content) => {
  //   setLoading(true);
  //   db.collection('posts')
  //     .doc()
  //     .set({
  //       title,
  //       content,
  //       userId: user.uid,
  //       displayName: user.displayName,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setAlert('danger', err.message);
  //     });
  // };

  return (
    <PostsContext.Provider value={{ loading, posts, getPosts, fetchMorePosts }}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProivder;
