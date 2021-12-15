import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import './style.css';
import check from '../../images/check.svg';
import {Gender, UserRegisterForm} from '../../types/UserType';
import {ErrorType, RedirectType} from '../../types/ErrorType';
import {
    validateLogin, validateEmail, validatePassword, validateRepeatPassword,
    validateName, validateSurname, validateGender, validateBirthDate, validateStatute, checkDataIsAvailable
} from '../../helpers/validators';
import {registerUser} from '../../helpers/api/user/userCall';
import useForm from '../../hooks/useForm';
import useCancelledPromise from '../../hooks/useCancelledPromise';
import FileInput from '../../components/FileInput';
import ReCaptcha from '../../components/ReCaptcha';
import ErrorMessage from '../../components/ErrorMessage';

interface RegisterFormProps {
}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
    const [url, setURL] = useState<RedirectType>();
    const [token, setToken] = useState<string>();
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        return () => {
            cancelPromise();
        };
    }, []);

    const sendRequestAuthToAPI = (form: UserRegisterForm, setErrors: (errors: ErrorType) => void): void => {
        if (token != null) {
            form.recaptcha = token;
        }

        promise(registerUser(form)).then((r) => {
            let response = (r as Response);
            if (response.status === 201) {
                setURL({
                    pathname: '/',
                    state: {
                        alertMessage: {
                            icon: check,
                            message: 'Pomyślna rejestracja!',
                        },
                    },
                });
            } else if (response.status === 401) {
                setURL({
                    pathname: '/',
                });
            } else if (response.status === 403) {
                response.json().then(allErrors => {
                    let e: ErrorType = {};
                    for (let oneError in allErrors['errors']) {
                        e[oneError] = allErrors['errors'][oneError][0];
                    }
                    setErrors(e);
                });
            } else {
                throw new Error();
            }
        }, (e) => {
            throw new Error();
        }).catch((e) => {
            setErrors({
                'non_field_errors': 'Serwis niedostępny',
            });
        });
    };

    const validateFormRegister = async (
        {login, email, password, repeat_password, name, surname, gender, birth_date, accept_statute}: UserRegisterForm,
        nameValidate?: string,
    ) => {
        switch (nameValidate) {
            case 'login':
                return validateLogin(login) && checkDataIsAvailable('login', login, false, promise);
            case 'email':
                return validateEmail(email) && checkDataIsAvailable('email', email, false, promise);
            case 'password':
                return validatePassword(password);
            case 'repeat_password':
                return validateRepeatPassword(password, repeat_password);
            case 'name':
                return validateName(name);
            case 'surname':
                return validateSurname(surname);
            case 'gender':
                return validateGender(gender);
            case 'birth_date':
                return validateBirthDate(birth_date);
            case 'accept_statute':
                return validateStatute(accept_statute);
            default:
                return true;
        }
    };

    const {updateValue, submitHandler, errors, setErrors} =
        useForm<UserRegisterForm>({
            initialObject: {
                login: '',
                email: '',
                password: '',
                repeat_password: '',
                birth_date: new Date().toISOString().split('T')[0],
                accept_statute: false,
                recaptcha: '',
            },
            validateObject: validateFormRegister,
            sendRequestToAPI: sendRequestAuthToAPI,
        });

    return (
        <form onSubmit={submitHandler}>
            <ReCaptcha setToken={setToken}/>
            {url && <Redirect to={url}/>}
            {errors.recaptcha && <ErrorMessage message={errors.recaptcha}/>}
            <div className="input-field">
                <div className="required-field">Login</div>
                <input type="text" name="login" onBlur={updateValue} autoComplete="username" required/>
                {errors.login && <ErrorMessage message={errors.login}/>}
            </div>
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" onBlur={updateValue} autoComplete="email" required/>
                {errors.email && <ErrorMessage message={errors.email}/>}
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" onBlur={updateValue} autoComplete="new-password" required/>
                {errors.password && <ErrorMessage message={errors.password}/>}
            </div>
            <div className="input-field">
                <div className="required-field">Powtórz hasło</div>
                <input type="password" name="repeat_password" onBlur={updateValue} autoComplete="new-password"
                       required/>
                {errors.repeat_password && <ErrorMessage message={errors.repeat_password}/>}
            </div>
            <div className="input-field">
                <div>Imię</div>
                <input type="text" name="name" onBlur={updateValue} autoComplete="given-name"/>
                {errors.name && <ErrorMessage message={errors.name}/>}
            </div>
            <div className="input-field">
                <div>Nazwisko</div>
                <input type="text" name="surname" onBlur={updateValue} autoComplete="family-name"/>
                {errors.surname && <ErrorMessage message={errors.surname}/>}
            </div>
            <div className="input-field">
                <div>Płeć</div>
                <select name="gender" onChange={updateValue}>
                    {Gender.map((x) =>
                        <option key={x.id} value={x.id}>{x.value}</option>
                    )}
                </select>
                {errors.gender && <ErrorMessage message={errors.gender}/>}
            </div>
            <div className="input-field">
                <div>Data urodzenia</div>
                <input
                    type="date"
                    name="birth_date"
                    max={new Date().toISOString().split('T')[0]}
                    onBlur={updateValue}
                    autoComplete="bday"
                    required
                />
                {errors.birth_date && <ErrorMessage message={errors.birth_date}/>}
            </div>
            <FileInput update={updateValue} start_errors={errors} set_errors={setErrors}/>
            <div className="input-field">
                <label className="label-checkbox">
                    <input type="checkbox" name="accept_statute" onChange={updateValue} required/>
                    <div className="required-field label-info">
                        Przeczytałem i akceptuje
                        <Link
                            className="link"
                            to={'/statute/'}
                            target="_blank"
                        >
                            regulamin
                        </Link>
                    </div>
                </label>
                {errors.accept_statute && <ErrorMessage message={errors.accept_statute}/>}
            </div>
            <button type="submit" className="button short-button" tabIndex={0} disabled={
                Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
            }>
                Zarejestruj się
            </button>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors}/>}
        </form>
    );
}

export default RegisterForm;
