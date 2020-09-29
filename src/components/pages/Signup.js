import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import db, { auth } from '../../firebase';
import { AlertContext } from '../../context/AlertContext';

const Signup = () => {
  const [details, setDetails] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const { displayName, email, password, confirmPassword } = details;

  const getFields = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setAlert('danger', 'Password mismatch');
      setLoading(false);
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          db.collection('users').doc(cred.user.uid).set({
            displayName,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          cred.user.updateProfile({ displayName });
          setDetails({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setLoading(false);
          setRedirect('/login');
        })
        .catch((err) => {
          setAlert('danger', err.message);
          setLoading(false);
        });
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className='signup-form'>
      <p className='heading'>Become a Memeber!</p>
      <form onSubmit={signUpUser}>
        <div className='form-group'>
          <div className='form-wrap'>
            <i className='fa fa-user icon'></i>
            <input
              type='text'
              onChange={getFields}
              name='displayName'
              value={displayName}
              className='form-field'
              placeholder='Display Name'
              required
            />
          </div>

          <div className='form-wrap'>
            <i className='fa fa-envelope icon'></i>
            <input
              type='email'
              onChange={getFields}
              name='email'
              value={email}
              className='form-field'
              placeholder='Email'
              required
            />
          </div>

          <div className='form-wrap'>
            <i className='fa fa-key'></i>
            <input
              type='password'
              onChange={getFields}
              name='password'
              value={password}
              className='form-field'
              placeholder='Password'
              required
            />
          </div>

          <div className='form-wrap'>
            <i className='fa fa-key'></i>
            <input
              type='password'
              onChange={getFields}
              name='confirmPassword'
              value={confirmPassword}
              className='form-field'
              placeholder='Confirm password'
              required
            />
          </div>
        </div>
        <div className='center'>
          <button type='submit' className='btn btn-blue button'>
            {loading ? <i className='fa fa-spinner fa-pulse' /> : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className='ta-c'>
        Already a member?{' '}
        <Link to='/login' className='secondary-link'>
          Log in
        </Link>{' '}
      </p>
    </div>
  );
};

export default Signup;
