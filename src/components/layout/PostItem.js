import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = () => {
  const apiData = {
    displayName: 'Chizzy',
    title: 'This is the title',
    date: '28/09/2020',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit Culpa debitis saepe incidunt quis nulla nostrum totam magnam vel rerum omnis eius animi odit Neque temporibus',
    user: null,
  };

  const { displayName, title, date, content, user } = apiData;

  return (
    <div className='post mb-max'>
      <div className='post-title'>
        <span>{title}</span>
        <span className='description float-right'>
          - {displayName} on {date}
        </span>
      </div>
      <div className='post-content-guest'>{content}</div>
      <div className='bottom-panel'>
        {user ? (
          <a href='#!' className='post-link float-right'>
            Read Post
            <i className='fa fa-arrow-right'></i>
          </a>
        ) : (
          <Link to='/login' className='post-link float-right'>
            Login to read
            <i className='fa fa-arrow-right'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostItem;
