import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  const { email, password } = details;

  const getFields = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const logInUser = (e) => {
    e.preventDefault();
    console.log(details);
    setDetails({
      email: '',
      password: '',
    });
  };

  return (
    <div className='login-form mb-max'>
      <p className='heading'>Welcome Back!</p>
      <form onSubmit={logInUser}>
        <div className='form-group'>
          <div className='form-wrap'>
            <i className='fa fa-user icon'></i>
            <input
              type='email'
              name='email'
              onChange={getFields}
              value={email}
              className='form-field'
              placeholder='Email'
            />
          </div>

          <div className='form-wrap'>
            <i className='fa fa-key'></i>
            <input
              type='password'
              name='password'
              onChange={getFields}
              value={password}
              className='form-field'
              placeholder='Password'
            />
          </div>
        </div>
        <div className='center'>
          <input
            type='submit'
            className='btn btn-orange button'
            value='Login'
          />
        </div>
      </form>
      <p className='ta-c'>
        Dont have an account?{' '}
        <Link to='/signup' className='primary-link'>
          Sign up
        </Link>{' '}
      </p>
    </div>
  );
};

export default Login;
