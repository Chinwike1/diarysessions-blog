import React, { useState, createContext } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    user ? setUser(user) : setUser(null);
  });

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
