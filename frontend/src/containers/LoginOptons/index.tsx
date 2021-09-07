import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import './style.css';
import email from '../../images/email.svg';
import google from '../../images/google.svg';
import facebook from '../../images/facebook.svg';
import addUser from '../../images/addUser.svg';

interface LoginOptionsProps {
    setChooseLoginEmail: (x: boolean) => void,
}

const LoginOptons: React.FC<LoginOptionsProps> = ({setChooseLoginEmail}) => {
    const [redirectLoginURL, setRedirectLoginURL] = useState<string>('');

    const handlerSetChooseLoginEmail = (url: string): void => {
         setChooseLoginEmail(true);
    };

    const handlerClickLogin = (url: string): void => {
        setRedirectLoginURL(url);
    };

    const options: { id: number, nameOption: string, nameClass: string,
        icon: string, link: string, handlerClick(url: string): void }[] = [
        {
            id: 1,
            nameOption: 'Zaloguj się emailem',
            nameClass: 'login-email',
            icon: email,
            link: '#',
            handlerClick: handlerSetChooseLoginEmail,
        },
        {
            id: 2,
            nameOption: 'Zaloguj się Google',
            nameClass: 'login-google',
            icon: google,
            link: '/google',
            handlerClick: handlerClickLogin,
        },
        {
            id: 3,
            nameOption: 'Zaloguj się Facebook',
            nameClass: 'login-facebook',
            icon: facebook,
            link: '/facebok',
            handlerClick: handlerClickLogin,
        },
        {
            id: 4,
            nameOption: 'Zarejestruj się',
            nameClass: 'login-email',
            icon: addUser,
            link: '/register',
            handlerClick: handlerClickLogin,
        }
    ];

    return (
        <div className="social-login-menu">
            {redirectLoginURL && <Redirect to={redirectLoginURL}/>}
            {options.map(x =>
                <div
                    key={x.id}
                    className={['button', 'social-login-button', x.nameClass].join(' ')}
                    onClick={(e) => x.handlerClick(x.link)}
                    tabIndex={0}
                    onKeyUp={(event) => {
                        if(event.key === 'Enter') {
                            x.handlerClick(x.link);
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
