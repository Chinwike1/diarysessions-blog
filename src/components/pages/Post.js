import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertContext } from '../../context/AlertContext';
import db from '../../firebase';

const Post = () => {
  const { postId } = useParams();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await db.collection('posts').doc(postId).get();
        setPost(data.data());
        setLoading(false);
      } catch (err) {
        setAlert('danger', err.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, setAlert]);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { displayName, title, content } = post;

  if (loading) {
    return (
      <div className='center mt-max'>
        <i className='fa fa-spinner fa-pulse font-3x' />
      </div>
    );
  }

  return (
    <Fragment>
      {post.length !== 0 && (
        <Fragment>
          <div className='mt-4 container'>
            <div className='card w-75 mx-auto single-post'>
              <h2 className='primary-color title mb-2'>{title}</h2>
              <p className='mb-2'>{content}</p>
              <div>
                <span className='description mr-2'>
                  Written by {displayName}
                </span>
                <Link to='/dashboard' className='button btn btn-neutral'>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Post;
