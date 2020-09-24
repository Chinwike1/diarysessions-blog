import React, { createContext, useEffect, useContext, useReducer } from 'react';
import firebase from 'firebase/app';
import db from '../firebase';
import { AlertContext } from './AlertContext';
import { UserContext } from './UserContext';
import { postsReducer } from '../reducers/postsReducer';
import {
  DELETE_POST,
  FETCH_MORE,
  GET_POSTS,
  GET_USERS_POSTS,
  LOADING_FALSE,
  LOADING_TRUE,
} from './types';

export const PostsContext = createContext();

const PostsContextProivder = (props) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const initialState = {
    posts: [],
    usersPosts: [],
    lastVisible: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(postsReducer, initialState);

  const postsRef = db.collection('posts').orderBy('createdAt', 'desc');
  const postsRefLimit = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1);

  const { user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const getPosts = async () => {
    try {
      const data = await postsRefLimit.get();
      dispatch({ type: GET_POSTS, payload: data });
    } catch (err) {
      setAlert('danger', err.message);
    }
  };

  const fetchMorePosts = async () => {
    dispatch({ type: LOADING_TRUE });
    try {
      const data = await postsRef.startAfter(state.lastVisible).limit(1).get();
      dispatch({ type: FETCH_MORE, payload: data });
    } catch (err) {
      dispatch({ type: LOADING_FALSE });
      setAlert('info', "You've reached the last post");
    }
  };

  const createPost = async (title, content, setDetails) => {
    dispatch({ type: LOADING_TRUE });
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
        dispatch({ type: LOADING_FALSE });
        setAlert('success', 'Post published sucessfully!');
      })
      .catch((err) => {
        dispatch({ type: LOADING_FALSE });
        setAlert('danger', err.message);
      });
  };

  const getUsersPosts = async () => {
    try {
      const data = await db
        .collection('posts')
        .where('userId', '==', user.uid)
        .get();

      dispatch({ type: GET_USERS_POSTS, payload: data });
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
        dispatch({ type: DELETE_POST, payload: id });
      })
      .catch((err) => {
        setAlert('warning', err.message);
      });
  };

  return (
    <PostsContext.Provider
      value={{
        loading: state.loading,
        usersPosts: state.usersPosts,
        getUsersPosts,
        posts: state.posts,
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
