import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='hero-section'>
      <div className='hero-heading'>
        <h2>Welcome to the Diary Sessions Blog</h2>
      </div>
      <div className='hero-text'>
        <p>Feel free to pen your thoughts and share it to the world!</p>
      </div>
      <Link to='/login' className='btn btn-orange'>
        Login
      </Link>
    </div>
  );
};

export default HeroSection;
