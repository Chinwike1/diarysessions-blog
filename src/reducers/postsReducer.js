import {
  DELETE_POST,
  FETCH_MORE,
  GET_POSTS,
  GET_USERS_POSTS,
  LOADING_FALSE,
  LOADING_TRUE,
} from '../context/types';

export const postsReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
        lastVisible: action.payload.docs[action.payload.docs.length - 1],
      };
    case GET_USERS_POSTS:
      return {
        ...state,
        usersPosts: action.payload.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      };
    case FETCH_MORE:
      return {
        ...state,
        posts: state.posts.concat(
          action.payload.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        ),
        lastVisible: action.payload.docs[action.payload.docs.length - 1],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        usersPosts: state.usersPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    case LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
