import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import db from '../../firebase';
import MyPostItem from '../layout/MyPostItem';

const MyPosts = () => {
  const { user, getUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
        setPosts(posts);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUsersPosts();
  }, [getUser]);

  const deletePost = async (id) => {
    const filteredPosts = posts.filter((post) => {
      return id !== post.id;
    });
    setPosts(filteredPosts);

    try {
      await db.collection('posts').doc(id).delete();
    } catch (err) {
      console.log(err.message);
    }
  };

  if (user === 'loading') {
    return <h2 className='ta-c'>Loading...</h2>;
  }
  if (user === null) {
    return <h2 className='ta-c'>Couldn't fetch your details</h2>;
  }

  return (
    <div className='container'>
      <h2 className='secondary-link my-2'>Your Posts</h2>

      {posts.length !== 0 && (
        <Fragment>
          <ul className='list-group my-posts'>
            {posts.map((post) => (
              <MyPostItem
                post={post}
                key={post.id}
                id={post.id}
                deletePost={deletePost}
              />
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
