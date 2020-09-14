import React, { useContext, Fragment } from 'react';
import PostItem from './PostItem';
import { PostsContext } from '../../context/PostsContext';
import PaginateBtn from './PaginateBtn';

const Posts = () => {
  const { posts } = useContext(PostsContext);

  // return (
  //   <Fragment>
  //     {posts.map((post) => (
  //       <PostItem post={post} key={Math.random()} />
  //     ))}
  //     {posts.length > 0 && <PaginateBtn />}
  //   </Fragment>
  // );

  return posts.map((post) => <PostItem post={post} key={Math.random()} />);
};

export default Posts;
