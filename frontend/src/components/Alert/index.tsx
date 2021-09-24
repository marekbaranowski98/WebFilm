import React from 'react';

import './style.css';
import {AlertType} from '../../types/ErrorType';

const Alert: React.FC<AlertType> = ({icon, message}) => {
    return (
        <div className="alert-container">
            <img src={icon}/>
            <p>{message}</p>
        </div>
    );
}

export default Alert;
