import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <button className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </button>
      <nav className='navigation navigation-black'>
        <a href='#!' className='brand-name left'>
          Diary Sessions
        </a>
        <ul>
          <li className='nav-links'>
            <Link to='/login'>Login</Link>
          </li>
          <li className='nav-links'>
            <Link to='/signup'>Signup</Link>
          </li>
        </ul>
      </nav>

      <div id='side-menu'>
        <ul className='list-group links'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          {/* <li>
            <Link href='#!'>Your Posts</Link>
          </li>
          <li>
            <Link href='#!'>Logout</Link>
          </li> */}
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
