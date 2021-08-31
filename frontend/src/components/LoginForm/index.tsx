import React, {useState} from 'react';

import './style.css';
import {validateEmail} from '../../helpers/validators';
import ErrorMessage from '../ErrorMessage';

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

    interface UserLoginError extends Partial<UserLoginForm> {
        non_field_errors?: string,
    }

    const [errors, setErrors] = useState<UserLoginError>({});

    const updateField = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handlerSubmit = () => {
        validateFormLogin(form);
    };
    
    const validateFormLogin = ({email}: UserLoginForm): boolean => {
        let checkFormIsOk: boolean = true;
        setErrors({});

        try {
            validateEmail(email);
        }catch (e: unknown) {
            setErrors({
                ...errors,
                email: (e as Error).message,
            });
            checkFormIsOk = false;
        }
        
        return checkFormIsOk;
    }

    return (
        <form>
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" onChange={updateField} required />
                {errors.email ?
                    <ErrorMessage message={errors.email} />
                    :
                    ''
                }
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" onChange={updateField} required />
            </div>
            <div className="button submit-button" tabIndex={0} onClick={handlerSubmit}>
                Zaloguj się
            </div>
            <div className="link-request-reset-password">Nie pamiętam hasłą</div>
        </form>
    );
};

export default LoginForm;
