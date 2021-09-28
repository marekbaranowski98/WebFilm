import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage';
import useForm from '../../hooks/useForm';
import {SendEmailResetPasswordEmail} from '../../types/UserType';
import {validateEmail} from '../../helpers/validators';
import {ErrorType, RedirectType} from '../../types/ErrorType';
import {requestResetPassword} from '../../helpers/api/user';
import ReCaptcha from '../../components/ReCaptcha';

interface RequestResetPasswordFormProps {
    setSendResetLink: (statusLink: boolean) => void,
}

const RequestResetPasswordForm: React.FC<RequestResetPasswordFormProps> = ({setSendResetLink}) => {
    const [url, setURL] = useState<RedirectType>();
    const [token, setToken] = useState<string>();

    const validateFormRequestResetPassword = async (
        {email}: SendEmailResetPasswordEmail,
        nameValidation?: string
    ): Promise<boolean> => {
        switch (nameValidation) {
            case 'email':
                return validateEmail(email);
            default:
                return true;
        }
    };

    const sendRequestAuthToAPI = (form: SendEmailResetPasswordEmail, setErrors: (errors: ErrorType) => void): void => {
        if (token != null) {
            form.recaptcha = token;
        }
        requestResetPassword(form).then((r) => {
            let response = (r as Response);
            if (response.status === 200) {
                setSendResetLink(true);
            } else if (response.status === 401) {
                setURL({
                    pathname: '/',
                });
            } else if (response.status === 404) {
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
    }

    const {updateValue, submitHandler, errors} = useForm<SendEmailResetPasswordEmail>({
        initialObject: {
            email: '',
            recaptcha: '',
        },
        validateObject: validateFormRequestResetPassword,
        sendRequestToAPI: sendRequestAuthToAPI,
    });

    return (
        <form onSubmit={submitHandler}>
            <ReCaptcha setToken={setToken}/>
            {url && <Redirect to={url}/>}
            {errors.recaptcha && <ErrorMessage message={errors.recaptcha}/>}
            <div className="input-field">
                <div className="required-field">Email</div>
                <input type="email" name="email" onBlur={updateValue} autoComplete="email" required/>
                {errors.email && <ErrorMessage message={errors.email}/>}
            </div>
            <button type="submit" className="button short-button" tabIndex={0} disabled={
                Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
            }>
                Resetuj hasło
            </button>
            {errors.non_field_errors && <ErrorMessage message={errors.non_field_errors}/>}
        </form>
    );
};

export default RequestResetPasswordForm;
