import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import check from '../../images/check.svg';
import error from '../../images/error.svg';
import ErrorMessage from '../../components/ErrorMessage';
import {ResetPasswordObject} from '../../types/UserType';
import {validatePassword, validateRepeatPassword} from '../../helpers/validators';
import {ErrorType, RedirectType} from '../../types/ErrorType';
import useForm from '../../hooks/useForm';
import {resetPassword} from '../../helpers/api/user';
import ReCaptcha from '../../components/ReCaptcha';

interface ResetPasswordFormProps {
    uuid: string,
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({uuid}) => {
    const [redirect, setRedirect] = useState<RedirectType>();
    const [token, setToken] = useState<string>();

    const validateFormRequestResetPassword = async (
        {password, repeat_password}: ResetPasswordObject,
        nameValidation?: string
    ): Promise<boolean> => {
        switch (nameValidation) {
            case 'password':
                return validatePassword(password);
            case 'repeat_password':
                return validateRepeatPassword(password, repeat_password);
            default:
                return true;
        }
    };

    const sendRequestAuthToAPI = (form: ResetPasswordObject, setErrors: (errors: ErrorType) => void): void => {
        if (token != null) {
            form.recaptcha = token;
        }
        resetPassword(uuid, form).then((r) => {
            let response = (r as Response);
            if (response.status === 204) {
                setRedirect({
                    pathname: '/login/',
                    state: {
                        alertMessage: {
                            icon: check,
                            message: 'Hasło zostało zmienione',
                        },
                    },
                });
            } else if (response.status === 401) {
                setRedirect({
                    pathname: '/',
                });
            } else if (response.status === 403) {
                response.json().then((allErrors) => {
                    let e: ErrorType = {};
                    for (let oneError in allErrors['errors']) {
                        e[oneError] = allErrors['errors'][oneError][0];
                    }
                    setErrors(e);
                });
            } else if (response.status === 404 || response.status === 408) {
                response.json().then((res) => {
                    setRedirect({
                        pathname: '/reset-password/',
                        state: {
                            alertMessage: {
                                icon: error,
                                message: res['non_field_errors'],
                            },
                        },
                    });
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
    }

    const {updateValue, submitHandler, errors} = useForm<ResetPasswordObject>({
        initialObject: {
            password: '',
            repeat_password: '',
            recaptcha: '',
        },
        validateObject: validateFormRequestResetPassword,
        sendRequestToAPI: sendRequestAuthToAPI,
    });
    return (
        <form onSubmit={submitHandler}>
            <ReCaptcha setToken={setToken}/>
            {redirect && <Redirect to={redirect}/>}
            {errors.recaptcha && <ErrorMessage message={errors.recaptcha}/>}
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
            <button type="submit" className="button short-button" tabIndex={0} disabled={
                Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
            }>
                Zmień hasło
            </button>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors}/>}
        </form>
    );
};

export default ResetPasswordForm;
