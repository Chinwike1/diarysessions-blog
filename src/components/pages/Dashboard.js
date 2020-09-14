import React, { useContext, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Posts from '../layout/Posts';
import { auth } from '../../firebase';

const Home = () => {
  const { user } = useContext(UserContext);

  if (user === null) {
    return <h2>Access Denied</h2>;
  }
  return (
    <Fragment>
      <div className='container'>
        <Posts />
        <Link to='/create-post' className='btn-blue create-post'>
          <i className='fa fa-plus'></i>
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
