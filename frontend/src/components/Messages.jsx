import React from 'react';
import '../Styles/Messages.css';


export const ErrorMessage = ({ message }) => {
    if (!message) return null;
    
    return (
        <div className="error-container">
            <p className="error-message">
                <i className="bi bi-exclamation-circle-fill"></i> {message}
            </p>
        </div>
    );
};

export const SuccessMessage = ({ message }) => {
    if (!message) return null;
    
    return (
        <div className="success-container">
            <p className="success-message">
                <i className="bi bi-check-circle-fill"></i> {message}
            </p>
        </div>
    );
};