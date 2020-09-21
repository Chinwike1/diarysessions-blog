import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';
import MyPostItem from '../layout/MyPostItem';

const MyPosts = () => {
  const { usersPosts, getUsersPosts } = useContext(PostsContext);

  useEffect(() => {
    getUsersPosts();
  }, [getUsersPosts]);

  return (
    <div className='container'>
      <h2 className='secondary-link my-2'>Your Posts</h2>

      {usersPosts.length !== 0 && (
        <Fragment>
          <ul className='list-group my-posts'>
            {usersPosts.map((post) => (
              <MyPostItem post={post} key={post.id} id={post.id} />
            ))}
          </ul>
          <Link to='/dashboard' className='mt btn paginate-btn black-text'>
            Back
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default MyPosts;
