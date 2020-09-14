import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
  const [alerts, setAlerts] = useState({});

  const setAlert = (type, msg) => {
    setAlerts({ msg, type });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      setAlerts({
        msg: '',
        type: '',
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alerts, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
