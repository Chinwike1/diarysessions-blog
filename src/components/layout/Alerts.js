import React, { useContext } from 'react';
import { AlertContext } from '../../context/AlertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div className={`mt-2 alert-wrapper alert-${alerts.type} mb`}>
      {alerts.msg}
    </div>
  );
};

export default Alerts;
