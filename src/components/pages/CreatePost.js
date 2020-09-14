import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/AlertContext';
import db from '../../firebase';
import { PostsContext } from '../../context/PostsContext';

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const { title, content } = post;
  const { user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const { loading, createPost } = useContext(PostsContext);

  if (user === null) {
    return <h2>Access Denied</h2>;
  }

  const getFields = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    if (title === '' || content === '') return;
    createPost(title, content);
  };

  return (
    <div className='container'>
      <div className='card w-75 mx-auto'>
        <h1 className='primary-color'>Create A Post!</h1>
        <form onSubmit={submitPost}>
          <div className='form-group'>
            <label htmlFor='Title'>Title</label>
            <input
              type='text'
              onChange={getFields}
              name='title'
              value={title}
              className='form-field'
            />

            <label htmlFor='Post'>Post</label>
            <textarea
              cols='30'
              rows='10'
              onChange={getFields}
              name='content'
              value={content}
            ></textarea>
          </div>
          <button type='submit' className='button btn btn-orange mr'>
            {loading ? <i className='fa fa-spinner fa-pulse' /> : 'Publish'}
          </button>
          <Link to='/dashboard' className='button btn btn-neutral'>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
