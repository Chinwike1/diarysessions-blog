import React, { useContext } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';

const MyPostItem = ({ post, id }) => {
  const { deletePost } = useContext(PostsContext);

  const confirmDelete = () => {
    if (window.confirm('If this post is deleted, it will be gone forever. Do you want to proceed?')) {
      deletePost(id);
    } else {
      return;
    }
  };

  return (
    <li>
      <Link to={`/post/${post.id}`} className='list-link'>
        {post.title}{' '}
        <span className='description ml'>
          on{' '}
          <Moment format='MMM Do YYYY, h:mm:ss a'>
            {post.createdAt.toDate()}
          </Moment>
        </span>
      </Link>
      <i onClick={confirmDelete} className='fa fa-trash delete-post'></i>
    </li>
  );
};

export default MyPostItem;
