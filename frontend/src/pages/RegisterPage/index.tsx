import React, {useContext, useEffect, useState} from 'react';

import RegisterForm from '../../containers/RegisterForm';
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";

interface RegisterPageProps {

}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const userContext = useContext(CurrentUserContext);

    useEffect(() => {
        userContext?.checkIsUserLogged().then(() => setRedirect(true), () => {});
    }, []);
    return (
        <div className="wrapper-form">
            {redirect && <Redirect to={{
                pathname: '/',
            }}/>}
            <div className="container-form">
                <h2>Zarejestruj się</h2>
                <RegisterForm/>
            </div>
        </div>
    );
}

export default RegisterPage;
