import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  };

  const [user, setUser] = useState('loading');

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
