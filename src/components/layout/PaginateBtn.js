import React, { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';

const PaginateBtn = () => {
  const { loading, fetchMorePosts } = useContext(PostsContext);

  return (
    <button
      type='submit'
      onClick={fetchMorePosts}
      className='button paginate-btn'
    >
      {loading ? <i className='fa fa-spinner fa-pulse' /> : 'More'}
    </button>
  );
};

export default PaginateBtn;
