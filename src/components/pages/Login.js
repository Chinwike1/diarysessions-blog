import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase';
import { AlertContext } from '../../context/AlertContext';

const Login = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email, password } = details;
  const { setAlert } = useContext(AlertContext);

  const getFields = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const logInUser = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === '' || password === '') return;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setRedirect('/dashboard');
        setDetails({
          email: '',
          password: '',
        });
        setLoading(false);
      })
      .catch((err) => {
        setAlert('danger', err.message);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

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
          <button type='submit' className='btn btn-orange button'>
            {loading ? <i className='fa fa-spinner fa-pulse' /> : 'Login'}
          </button>
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
