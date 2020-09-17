import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import db from '../firebase';
import { AlertContext } from './AlertContext';
import { UserContext } from './UserContext';

export const PostsContext = createContext();

const PostsContextProivder = (props) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const [posts, setPosts] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [loading, setLoading] = useState(false);

  const postsRef = db.collection('posts').orderBy('createdAt', 'desc');
  const postsRefLimit = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1);

  const { user, getUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const getPosts = async () => {
    try {
      const data = await postsRefLimit.get();
      setLastVisible(data.docs[data.docs.length - 1]);
      const firestorePosts = data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(firestorePosts);
    } catch (err) {
      setAlert('danger', err.message);
    }
  };

  const fetchMorePosts = async () => {
    setLoading(true);
    try {
      const data = await postsRef.startAfter(lastVisible).limit(1).get();
      setLastVisible(data.docs[data.docs.length - 1]);
      const firestorePosts = data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(posts.concat(firestorePosts));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAlert('danger', err.message);
    }
  };

  const createPost = async (title, content, setDetails) => {
    setLoading(true);
    await db
      .collection('posts')
      .doc()
      .set({
        title,
        content,
        userId: user.uid,
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setDetails({ title: '', content: '' });
        setLoading(false);
        setAlert('success', 'Post published sucessfully!');
      })
      .catch((err) => {
        setLoading(false);
        setAlert('danger', err.message);
      });
  };

  const getUsersPosts = async () => {
    try {
      const user = await getUser();

      const data = await db
        .collection('posts')
        .where('userId', '==', user.uid)
        .get();

      const posts = data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setUsersPosts(posts);
    } catch (err) {
      setAlert('danger', 'Unable to fetch your posts.');
    }
  };

  const deletePost = async (id) => {
    await db
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        const filteredPosts = usersPosts.filter((post) => {
          return id !== post.id;
        });
        setUsersPosts(filteredPosts);
      })
      .catch((err) => {
        setAlert('warning', err.message);
      });
  };

  return (
    <PostsContext.Provider
      value={{
        loading,
        usersPosts,
        getUsersPosts,
        posts,
        getPosts,
        createPost,
        deletePost,
        fetchMorePosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProivder;
