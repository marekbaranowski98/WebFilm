import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import ErrorMessage from '../../components/ErrorMessage';
import useForm from '../../hooks/useForm';
import {Gender, UserRegisterForm} from '../../types/UserType';
import {ErrorType} from '../../types/ErrorType';
import {
    validateLogin, validateEmail, validatePassword, validateRepeatPassword,
    validateName, validateSurname, validateGender, validateBirthDate, validateStatute, checkDataIsAvailable
} from '../../helpers/validators';

interface RegisterFormProps {
}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
    const sendRequestAuthToAPI = (form: UserRegisterForm, setErrors: (errors: ErrorType) => void): void => {
        console.log(form);
    };
    const validateFormRegister = async (
        {login, email, password, repeat_password, name, surname, gender, birth_date , accept_statute}: UserRegisterForm,
        nameValidate?: string,
    ) => {
        switch (nameValidate) {
            case 'login':
                return validateLogin(login) && checkDataIsAvailable('login', login);
            case 'email':
                return validateEmail(email) && checkDataIsAvailable('email', email);
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

    const {updateValue, submitHandler, errors} = useForm<UserRegisterForm>({
        initialObject: {
            login: '',
            email: '',
            password: '',
            repeat_password: '',
            birth_date: new Date().toISOString().split('T')[0],
            accept_statute: false,
        },
        validateObject: validateFormRegister,
        sendRequestToAPI: sendRequestAuthToAPI,
    });

    return (
        <form onSubmit={submitHandler}>
            <div className="input-field">
                <div className="required-field">Login</div>
                <input type="text" name="login" onBlur={updateValue} autoComplete="username" required />
                {errors.login && <ErrorMessage message={errors.login} />}
            </div>
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" onBlur={updateValue} autoComplete="email" required />
                {errors.email && <ErrorMessage message={errors.email} />}
            </div>
            <div className="input-field">
                <div className="required-field">Hasło</div>
                <input type="password" name="password" onBlur={updateValue} autoComplete="new-password" required />
                {errors.password && <ErrorMessage message={errors.password} />}
            </div>
            <div className="input-field">
                <div className="required-field">Powtórz hasło</div>
                <input type="password" name="repeat_password" onBlur={updateValue} autoComplete="new-password" required />
                {errors.repeat_password && <ErrorMessage message={errors.repeat_password} />}
            </div>
            <div className="input-field">
                <div>Imię</div>
                <input type="text" name="name" onBlur={updateValue} autoComplete="given-name" />
                {errors.name && <ErrorMessage message={errors.name} />}
            </div>
            <div className="input-field">
                <div>Nazwisko</div>
                <input type="text" name="surname" onBlur={updateValue} autoComplete="family-name" />
                {errors.surname && <ErrorMessage message={errors.surname} />}
            </div>
            <div className="input-field">
                <div>Płeć</div>
                <select name="gender" onChange={updateValue}>
                    {Gender.map((x) =>
                            <option key={x.id} value={x.id}>{x.value}</option>
                    )}
                </select>
                {errors.gender && <ErrorMessage message={errors.gender} />}
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
                {errors.birth_date && <ErrorMessage message={errors.birth_date} />}
            </div>
            <div className="input-field">
                <label className="label-checkbox">
                    <input type="checkbox" name="accept_statute" onChange={updateValue} required />
                    <div className="required-field label-info">
                        Przeczytałem i akceptuje <Link
                            className="link"
                            to={'/docs/statute'}
                            target="_blank">regulamin
                        </Link>
                    </div>
                </label>
                {errors.accept_statute && <ErrorMessage message={errors.accept_statute} />}
            </div>
            <button type="submit" className="button short-button" tabIndex={0}>Zarejestruj się</button>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors} />}
        </form>
    );
}

export default RegisterForm;
