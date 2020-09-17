import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MyPostItem = ({ post, deletePost, id }) => {
  const confirmDelete = () => {
    if (window.confirm('Are you sure?')) {
      deletePost(id);
    } else {
      return;
    }
  };

  return (
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
      <i onClick={confirmDelete} className='fa fa-trash delete-post'></i>
    </li>
  );
};

export default MyPostItem;
