import React from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import useForm from '../../hooks/useForm';
import {SendEmailResetPasswordEmail} from '../../types/UserType';
import {validateEmail} from '../../helpers/validators';
import {ErrorType} from '../../types/ErrorType';
import {requestResetPassword} from '../../helpers/api/user';

interface RequestResetPasswordFormProps {
    setSendResetLink: (statusLink: boolean) => void,
}

const RequestResetPasswordForm: React.FC<RequestResetPasswordFormProps> = ({setSendResetLink}) => {
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

    const sendRequestAuthToAPI  = (form: SendEmailResetPasswordEmail, setErrors: (errors: ErrorType) => void): void => {
        requestResetPassword(form).then((r) => {
            let response = (r as Response);
            if(response.status === 200) {
                setSendResetLink(true);
            }else if(response.status === 404) {
                response.json().then(allErrors => {
                    let e: ErrorType = {};
                    for (let oneError in allErrors['errors']) {
                        e[oneError] = allErrors['errors'][oneError][0];
                    }
                    setErrors(e);
                });
            }else {
                throw new Error();
            }
        }, (e) => {
           throw new Error();
        }).catch((e) =>{
            setErrors({
                'non_field_errors': 'Serwis niedostępny',
            });
        });
    }

    const {updateValue, submitHandler, errors} = useForm<SendEmailResetPasswordEmail>({
        initialObject: {
            email: '',
        },
        validateObject: validateFormRequestResetPassword,
        sendRequestToAPI: sendRequestAuthToAPI,
    });
    return(
        <form onSubmit={submitHandler}>
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
