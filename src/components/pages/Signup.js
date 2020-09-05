import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [details, setDetails] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = details;

  const getFields = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const signInUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password mismatch');
    } else {
      console.log(details);
      setDetails({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className='signup-form'>
      <p className='heading'>Become a Memeber!</p>
      <form onSubmit={signInUser}>
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
            />
          </div>
        </div>
        <div className='center'>
          <input
            type='submit'
            className='btn btn-blue button'
            value='Sign up'
          />
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
