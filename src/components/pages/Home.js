import React, { Fragment } from 'react';
import PostItem from '../layout/PostItem';
import HeroSection from '../layout/HeroSection';

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <div className='container'>
        <PostItem />
      </div>
    </Fragment>
  );
};

export default Home;
