import React from 'react';
import {Link} from 'react-router-dom'

import './style.css';

interface LoginUserButton {

}

const LoginUserButton: React.FC<LoginUserButton> = ({}) => {
    return (
        <div className="container-login-button">
            <Link className="button" to={'/login/'}>Zaloguj się</Link>
            <Link className="button" to={'/register/'}>Zarejestruj się</Link>
        </div>
    );
};

export default LoginUserButton;
