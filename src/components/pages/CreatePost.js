import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/AlertContext';
import db from '../../firebase';

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const { title, content } = post;
  const { user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  if (user === null) {
    return <h2>Access Denied</h2>;
  }

  const getFields = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    setLoading(true);
    db.collection('posts')
      .doc()
      .set({
        title,
        content,
        userId: user.uid,
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlert('danger', err.message);
      });
    setPost({ title: '', content: '' });
    setAlert('success', 'Post published successfully!');
  };

  // createPost(title, content);

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
          <button type='submit' className='button paginate-btn'>
            {loading ? <i className='fa fa-spinner fa-pulse' /> : 'More'}
          </button>
          <Link to='/dashboard' className='button btn btn-bg btn-neutral'>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
