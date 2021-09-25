import React, {useContext, useEffect, useState} from 'react';

import RegisterForm from '../../containers/RegisterForm';
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";
import {RedirectType} from "../../types/ErrorType";
import error from "../../images/error.svg";

interface RegisterPageProps {
}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();

    useEffect(() => {
        userContext?.checkIsUserLogged().then(() => setURL({pathname: '/'}), () => {
        }).catch((e) => {
            setURL({
                pathname: '/',
                state: {
                    alertMessage: {
                        icon: error,
                        message: 'Serwis niedostępny',
                    },
                },
            });
        });
    }, []);
    return (
        <div className="wrapper-form">
            {url && <Redirect to={url}/>}
            <div className="box-form">
                <div className="container-form">
                    <h2>Zarejestruj się</h2>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
