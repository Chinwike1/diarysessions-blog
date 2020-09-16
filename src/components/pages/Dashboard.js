import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Posts from '../layout/Posts';

const Home = () => {
  const { user } = useContext(UserContext);

  if (user === 'loading') {
    return <h2 className='ta-c'>Loading...</h2>;
  }
  if (user === null) {
    return <h2 className='ta-c'>Couldn't fetch your details</h2>;
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
