import React, {useState} from 'react';

import './style.css';

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
    interface UserLoginForm {
        email: string,
        password: string,
    }

    const [form, setForm] = useState<UserLoginForm>({
        email: '',
        password: '',
    });

    const handlerSubmit = () => {
    };

    return (
        <form onSubmit={handlerSubmit}>
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" required/>
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" required/>
            </div>
            <div className="button submit-button" onClick={handlerSubmit} tabIndex={0}>
                Zaloguj się
            </div>
            <div className="link-request-reset-password">Nie pamiętam hasłą</div>
        </form>
    );
};

export default LoginForm;
