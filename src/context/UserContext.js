import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, []);

  const getUser = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
          setUser(user);
        } else {
          reject('Could not fetch user');
          setUser(null);
        }
      });
    });
  };

  const [user, setUser] = useState('loading');

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
