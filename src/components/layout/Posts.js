import React, { useContext, Fragment } from 'react';
import PostItem from './PostItem';
import { PostsContext } from '../../context/PostsContext';
import PaginateBtn from './PaginateBtn';

const Posts = () => {
  const { posts } = useContext(PostsContext);

  return (
    <Fragment>
      <h2 className='primary-color mb-2'>All Posts</h2>
      <div className='posts-container'>
        {posts.map((post) => (
          <PostItem post={post} key={Math.random()} />
        ))}
      </div>
      {posts.length > 0 && (
        <div className='center'>
          <PaginateBtn />
        </div>
      )}
    </Fragment>
  );
};

export default Posts;
