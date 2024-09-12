import React, { useEffect } from 'react';
import '../styles/Alert.css';

function Alert({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message && (
      <div className={`alert ${type}`}>
        <p className="alert-message">{message}</p>
        <button className="alert-close" onClick={onClose}>×</button>
      </div>
    )
  );
}

export default Alert;