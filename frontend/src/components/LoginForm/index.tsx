import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import './style.css';
import {UserLoginForm} from '../../types/UserType';
import {ErrorsType} from '../../types/ErrorType';
import {validateEmail} from '../../helpers/validators';
import {loginUser} from '../../helpers/api/user';
import ErrorMessage from '../ErrorMessage';
import {CurrentUserContext} from '../../context/CurrentUserContext';

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const [form, setForm] = useState<UserLoginForm>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<ErrorsType>({});
    const [redirect, setRedirect] = useState<boolean>(false);
    const userContext = React.useContext(CurrentUserContext);

    const updateField = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handlerSubmit = () => {
        if(validateFormLogin(form)) {
             loginUser(form).then((resolve) => {
                 let res = (resolve as Response);
                 if (res.status !== 200) {
                     res.json().then(allErrors => {
                         let e: ErrorsType = {};
                         for(let oneError in allErrors['errors']) {
                             e[oneError] = allErrors['errors'][oneError][0];
                         }
                         setErrors(e);
                     });
                 } else {
                     userContext?.checkIsUserLogged().then((e) => {}, (r) => {});
                     setRedirect(true);
                 }
             }, (e) => {
                setErrors({
                    non_field_errors: e.message
                })
            });
        }
    };
    
    const validateFormLogin = ({email}: UserLoginForm): boolean => {
        let checkFormIsOk: boolean = true;
        setErrors({});

        try {
            validateEmail(email);
        }catch (e: unknown) {
            setErrors({
                ...errors,
                email: (e as ErrorsType).message,
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
                {errors.email && <ErrorMessage message={errors.email} />}
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" onChange={updateField} required />
            </div>
            <div className="button submit-button" tabIndex={0} onClick={handlerSubmit}>
                Zaloguj się
            </div>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors} />}
            <div className="link-request-reset-password">Nie pamiętam hasłą</div>
            {redirect && <Redirect to={{
                pathname: '/'
            }}/>}
        </form>
    );
};

export default LoginForm;
