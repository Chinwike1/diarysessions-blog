import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/AlertContext';
import { PostsContext } from '../../context/PostsContext';

const CreatePost = () => {
  const [details, setDetails] = useState({
    title: '',
    content: '',
  });

  const { title, content } = details;
  const { setAlert } = useContext(AlertContext);
  const { loading, createPost } = useContext(PostsContext);

  const getFields = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    if (title === '' || content === '') return;
    if (content.length < 175) {
      setAlert('danger', 'Content must be up to 175 characters');
    } else {
      createPost(title, content, setDetails);
    }
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
              className='form-input'
              required
            />

            <label htmlFor='Post'>Post</label>
            <textarea
              cols='30'
              rows='10'
              onChange={getFields}
              name='content'
              value={content}
              required
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
