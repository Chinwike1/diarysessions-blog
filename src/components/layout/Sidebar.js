import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebase';

const Sidebar = ({ open }) => {
  const { user } = useContext(UserContext);

  const logout = () => {
    auth.signOut();
  };

  return (
    <div className={open ? 'side-menu open' : 'side-menu'}>
      <ul className='list-group links'>
        {user ? (
          <Fragment>
            <li>
              <Link to='/posts'>Your Posts</Link>
            </li>
            <li>
              <a href='#!' onClick={logout}>
                Logout
              </a>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
