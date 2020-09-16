import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebase';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  const openSidebar = () => {
    setOpen(!open);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <Fragment>
      <button
        onClick={openSidebar}
        className={open ? 'hamburger close' : 'hamburger'}
      >
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </button>
      <nav className='navigation navigation-black'>
        <Link to='/' className='brand-name left'>
          Diary Sessions
        </Link>
        <ul>
          {user !== 'loading' && user !== null ? (
            <Fragment>
              <li className='nav-links'>
                <Link to='/myposts'>Your Posts</Link>
              </li>
              <li className='nav-links'>
                <a href='#!' onClick={logout}>
                  Logout
                </a>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className='nav-links'>
                <Link to='/login'>Login</Link>
              </li>
              <li className='nav-links'>
                <Link to='/signup'>Signup</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>

      <Sidebar open={open} />
    </Fragment>
  );
};

export default Navbar;
