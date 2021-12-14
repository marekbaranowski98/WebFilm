import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import './style.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {UserLoginForm} from '../../types/UserType';
import {ErrorType} from '../../types/ErrorType';
import {validateEmail} from '../../helpers/validators';
import {loginUser} from '../../helpers/api/user/userCall';
import useForm from '../../hooks/useForm';
import useCancelledPromise from '../../hooks/useCancelledPromise';
import ErrorMessage from '../../components/ErrorMessage';
import ReCaptcha from '../../components/ReCaptcha';

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [token, setToken] = useState<string>();
    const userContext = React.useContext(CurrentUserContext);
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        return () => {
            cancelPromise();
        };
    }, []);

    const sendRequestAuthToAPI = (form: UserLoginForm, setErrors: (errors: ErrorType) => void): void => {
        if (token != null) {
            form.recaptcha = token;
        }

        promise(loginUser(form)).then((resolve) => {
            let res = (resolve as Response);
            if (res.status !== 200) {
                res.json().then(allErrors => {
                    let e: ErrorType = {};
                    for (let oneError in allErrors['errors']) {
                        e[oneError] = allErrors['errors'][oneError][0];
                    }
                    setErrors(e);
                });
            } else {
                userContext?.checkIsUserLogged().then(() => {}, () => {});
                setRedirect(true);
            }
        }, (e) => {
            setErrors({
                non_field_errors: e.message
            })
        });
    };
    const validateFormLogin = async (
        {email}: UserLoginForm,
        nameValidate?: string,
    ): Promise<boolean> => {
        switch (nameValidate) {
            case 'email':
                return validateEmail(email);
            default:
                return true;
        }
    };
    const {updateValue, submitHandler, errors} = useForm<UserLoginForm>({
        initialObject: {
            email: '',
            password: '',
            recaptcha: '',
        },
        validateObject: validateFormLogin,
        sendRequestToAPI: sendRequestAuthToAPI,
    });

    return (
        <form onSubmit={submitHandler}>
            <ReCaptcha setToken={setToken}/>
            {errors.recaptcha && <ErrorMessage message={errors.recaptcha}/>}
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" onBlur={updateValue} required/>
                {errors.email && <ErrorMessage message={errors.email}/>}
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" onBlur={updateValue} required/>
            </div>
            <label className="input-field label-checkbox">
                <input type="checkbox" name="remember_me" onChange={updateValue}/>
                <div className="label-info">Zapamiętaj mnie</div>
            </label>
            <button type="submit" className="button short-button" tabIndex={0} disabled={
                Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
            }>
                Zaloguj się
            </button>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors}/>}
            <Link className="link link-request-reset-password" to={'/reset-password/'}>Nie pamiętam hasła</Link>
            {redirect && <Redirect to={{
                pathname: '/',
            }}/>}
        </form>
    );
};

export default LoginForm;
