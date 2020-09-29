import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Moment from 'react-moment';

const PostItem = ({ post }) => {
  const { user } = useContext(UserContext);
  const { id } = post;
  const { displayName, title, content, createdAt } = post.data;

  return (
    <div className='post mb'>
      <div className='post-title'>
        <span className='description mb float-right'>
          - {displayName} on{' '}
          <Moment format='MMM Do YYYY'>{createdAt.toDate()}</Moment>
        </span>
        <span className='headline'>{title}</span>
      </div>
      <div className='post-content'>
        {user === null || user === 'loading' ? content.slice(0, 175) : content}
      </div>
      <div className='bottom-panel'>
        {user === null || user === 'loading' ? (
          <Link to='/login' className='post-link float-right'>
            Login to Read
            <i className='fa fa-arrow-right'></i>
          </Link>
        ) : (
          <Link to={`/post/${id}`} className='post-link float-right'>
            Read Post
            <i className='fa fa-arrow-right'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostItem;
