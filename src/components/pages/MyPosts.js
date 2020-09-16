import React, { Fragment, useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import db from '../../firebase';

const MyPosts = () => {
  const { getUser } = useContext(UserContext);
  const [userId, setUserId] = useState('loading');

  useEffect(() => {
    const getUsersPosts = async () => {
      getUser()
        .then((user) => {
          setUserId(user.uid);
        })
        .catch(() => {
          setUserId(null);
        });

      await db
        .collection('posts')
        .where('userId', '==', userId)
        .get()
        .then((snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setPosts(posts);
        });
    };
    getUsersPosts();
  }, [getUser, userId]);
  const [posts, setPosts] = useState([]);

  if (userId === 'loading') {
    return <h2 className='ta-c'>Loading...</h2>;
  }
  if (userId === null) {
    return <h2 className='ta-c'>Couldn't fetch your details</h2>;
  }

  return (
    <div className='container'>
      <h2 className='secondary-link my-2'>Your Posts</h2>

      {posts.length !== 0 && (
        <Fragment>
          <ul className='list-group my-posts'>
            {posts.map((post) => (
              <li>
                <Link to={`/post/${post.id}`} className='list-link'>
                  {post.data.title}{' '}
                  <span className='description ml'>
                    on{' '}
                    <Moment format='MMM Do YYYY, h:mm:ss a'>
                      {post.data.createdAt.toDate()}
                    </Moment>
                  </span>
                </Link>
                <i className='fa fa-trash delete-post'></i>
              </li>
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
