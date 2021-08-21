import React from 'react';

import './style.css';

interface LoginUserButton {
    setUserIsLogged: (userIsLogged: boolean) => void,
}

const LoginUserButton: React.FC<LoginUserButton> = ({setUserIsLogged}) => {
    const loginUser = (): void => {
        setUserIsLogged(true);
    };

    return (
        <div className="container-login-button">
            <div className="button" onClick={() => loginUser()}>Zaloguj się</div>
            <div className="button">Zarejestruj się</div>
        </div>
    );
};

export default LoginUserButton;
