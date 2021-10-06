import React from 'react';

import './style.css';
import error from '../../images/error.svg';

interface ErrorMessageProps {
    message: string,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <div className="error">
            <img src={error} alt="Wystąpił błąd" />
            <div>{message}</div>
        </div>
    );
};

export default ErrorMessage;
