import React from 'react';

import './style.css';
import email from '../../images/email.svg';
import google from '../../images/google.svg';
import facebook from '../../images/facebook.svg';

interface LoginOptionsProps {
    setChooseLoginEmail: (x: boolean) => void,
}

const LoginOptons: React.FC<LoginOptionsProps> = ({setChooseLoginEmail}) => {
    const handlerSetChooseLoginEmail = (): void => {
         setChooseLoginEmail(true);
    };

    const handlerClickLogin = (): void => {

    };

    const options: { id: number, nameOption: string, nameClass: string, icon: string, handlerClick(): void }[] = [
        {
            id: 1,
            nameOption: "Zaloguj się emailem",
            nameClass: "login-email",
            icon: email,
            handlerClick: handlerSetChooseLoginEmail,
        },
        {
            id: 2,
            nameOption: "Zaloguj się Google",
            nameClass: "login-google",
            icon: google,
            handlerClick: handlerClickLogin,
        },
        {
            id: 3,
            nameOption: "Zaloguj się Facebook",
            nameClass: "login-facebook",
            icon: facebook,
            handlerClick: handlerClickLogin,
        },
    ];

    return (
        <div className="social-login-menu">
            {options.map(x =>
                <div
                    key={x.id}
                    className={['button', 'social-login-button', x.nameClass].join(' ')}
                    onClick={x.handlerClick}
                    tabIndex={0}
                    onKeyUp={(event) => {
                        if(event.key === 'Enter') {
                            x.handlerClick();
                        }
                    }}
                >
                    <img src={x.icon} alt={x.nameOption} className="social-login-icon" />
                    <div className="name-option-login">{x.nameOption}</div>
                </div>)}
        </div>
    );
};

export default LoginOptons;
