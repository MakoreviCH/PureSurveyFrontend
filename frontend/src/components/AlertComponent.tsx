import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, Collapse } from '@mui/material';

interface AlertProps {
  status: boolean; 
  type: string; 
  text: string;
  setStatus: (arg0: boolean) => void;
}

const CustomAlert = ({ status, type, text, setStatus }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (status) { 
      setShowAlert(true);
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
        setStatus(false);
        
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  return (

      <Collapse in={showAlert}>
        <Alert
          severity={type as AlertColor} 
        >
          {text || "Default message"}
        </Alert>
      </Collapse>
  );
};

export default CustomAlert;