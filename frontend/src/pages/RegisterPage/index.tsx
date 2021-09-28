import React from 'react';

import RegisterForm from '../../containers/RegisterForm';
import ReCaptchaProvider from '../../context/ReCaptchaContext';

interface RegisterPageProps {
}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
    return (
        <div className="wrapper-form">
            <div className="box-form">
                <div className="container-form">
                    <h2>Zarejestruj się</h2>
                    <ReCaptchaProvider>
                        <RegisterForm/>
                    </ReCaptchaProvider>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
