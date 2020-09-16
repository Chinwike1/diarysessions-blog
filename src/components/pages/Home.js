import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import HeroSection from '../layout/HeroSection';
import Posts from '../layout/Posts';

const Home = () => {
  const { user } = useContext(UserContext);

  if (user !== 'loading' && user !== null) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <HeroSection />
      <div className='container'>
        <Posts />
      </div>
    </Fragment>
  );
};

export default Home;
