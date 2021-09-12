import React from 'react';

import RegisterForm from '../../containers/RegisterForm';

interface RegisterPageProps {

}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
    return (
        <div className="wrapper-form">
            <div className="container-form">
                <h2>Zarejestruj się</h2>
                <RegisterForm/>
            </div>
        </div>
    );
}

export default RegisterPage;
