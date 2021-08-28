import React from 'react';

import './style.css';
import email from '../../images/email.svg';
import google from '../../images/google.svg';
import facebook from '../../images/facebook.svg';

interface LoginOptionsProps {
}

const LoginOptons: React.FC<LoginOptionsProps> = () => {
    const options: { id: number, nameOption: string, nameClass: string, icon: string }[] = [
        { id: 1, nameOption: "Zaloguj się emailem", nameClass: "login-email", icon: email },
        { id: 2, nameOption: "Zaloguj się Google", nameClass: "login-google", icon: google },
        { id: 3, nameOption: "Zaloguj się Facebook", nameClass: "login-facebook", icon: facebook },
    ];

    return (
        <div className="social-login-menu">
            {options.map(x =>
                <div key={x.id} className={['button', 'social-login-button', x.nameClass].join(' ')}>
                    <img src={x.icon} alt={x.nameOption} className="social-login-icon" />
                    <div className="name-option-login">{x.nameOption}</div>
                </div>)}
        </div>
    );
};

export default LoginOptons;
