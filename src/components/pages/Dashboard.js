import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Posts from '../layout/Posts';

const Home = () => {
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
