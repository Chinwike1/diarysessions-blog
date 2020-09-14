import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import HeroSection from '../layout/HeroSection';
import Posts from '../layout/Posts';
import { PostsContext } from '../../context/PostsContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const { fetchMorePosts } = useContext(PostsContext);

  if (user) {
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
