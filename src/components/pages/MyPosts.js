import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';
import { UserContext } from '../../context/UserContext';
import MyPostItem from '../layout/MyPostItem';

const MyPosts = () => {
  const { user } = useContext(UserContext);
  const { usersPosts, getUsersPosts } = useContext(PostsContext);

  useEffect(() => {
    getUsersPosts();
  }, [getUsersPosts]);

  if (user === 'loading') {
    return <h2 className='ta-c'>Loading...</h2>;
  }
  if (user === null) {
    return <h2 className='ta-c'>Couldn't fetch your details</h2>;
  }

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
