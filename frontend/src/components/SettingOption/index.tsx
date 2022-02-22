import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';

import './style.css';
import check from '../../images/check.svg';
import error from '../../images/error.svg';
import info from '../../images/info.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {AlertType, ErrorType, RedirectType} from '../../types/ErrorType';
import {FileUploadType} from '../../types/FileType';
import {
    checkDataIsAvailable, validateBirthDate,
    validateEmail, validateGender,
    validateLogin, validateName,
    validatePassword,
    validateRepeatPassword, validateSurname
} from '../../helpers/validators';
import useForm from '../../hooks/useForm';

interface SettingOptionProps {
    generateForm: (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ) => React.ReactNode;
    label: string,
    value: string,
    typeForm: object,
    setAlert: (alert: AlertType) => void,
    icon: string,
    sendRequestToAPI: (form: object,) => Promise<any>,
    nameOKButton: string,
}

const SettingOption: React.FC<SettingOptionProps> = ({
                                                         generateForm, label, value, typeForm, setAlert,
                                                         icon, sendRequestToAPI, nameOKButton
                                                     }) => {
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();
    const [form, setForm] = useState<boolean>();

    const closeForm = (): void => {
        setForm(undefined);
    };

    const openForm = (): void => {
        setForm(true);
    };

    const validateObject = async (
        obj: any,
        nameValidate: string,
    ): Promise<boolean> => {
        switch (nameValidate) {
            case 'login':
                return validateLogin(obj['login']) && checkDataIsAvailable('login', obj['login'], true);
            case 'email':
                return validateEmail(obj['email']) && checkDataIsAvailable('email', obj['email'], true);
            case 'password':
                return validatePassword(obj['password']);
            case 'repeat_password':
                return validateRepeatPassword(obj['password'], obj['repeat_password']);
            case 'name':
                return validateName(obj['name']);
            case 'surname':
                return validateSurname(obj['surname']);
            case 'gender':
                return validateGender(obj['gender']);
            case 'birth_date':
                return validateBirthDate(obj['birth_date']);
            default:
                return true;
        }
    };

    const sendRequest = (form: object, setErrors: (errors: ErrorType) => void): void => {
        sendRequestToAPI(form).then((r) => {
            let response = (r as Response);
            if (response.status === 200) {
                response.json().then((u => userContext?.updateUser(u)));
                setAlert({
                    icon: check,
                    message: `Pole: ${label} - zostało zmienione.`,
                });
                closeForm();
            } else if (response.status === 204) {
                userContext?.logoutUser();
                setURL({
                    pathname: '/',
                    state: {
                        alertMessage: {
                            icon: info,
                            message: 'Zostałeś wylogowany.',
                        },
                    },
                });
            } else if (response.status === 401 || response.status === 404) {
                setURL({
                    pathname: '/',
                    state: {
                        alertMessage: {
                            icon: error,
                            message: 'Nie jesteś zalogowany.',
                        },
                    },
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

    const {updateValue, submitHandler, errors} =
        useForm<typeof typeForm>({
            initialObject: {},
            validateObject: validateObject,
            sendRequestToAPI: sendRequest,
        });

    return (
        <>
            {url && <Redirect to={url}/>}
            {form ?
                <div className="wrapper-form grid-form">
                    <form className="container-form" onSubmit={submitHandler}>
                        {generateForm(updateValue, errors)}
                        <div className="container-login-button">
                            <div className="button short-button" onClick={closeForm}>Anuluj</div>
                            <button
                                type="submit"
                                className="button short-button"
                                disabled={
                                    Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
                                }
                            >
                                {nameOKButton}
                            </button>
                        </div>
                    </form>
                </div>
                :
                <>
                    <div className="settings-label">{label}</div>
                    <div className="settings-field">
                        <p>{value}</p>
                        <img
                            src={icon}
                            alt="Akcja"
                            onClick={openForm}
                        />
                    </div>
                </>
            }
        </>
    );
};

export default SettingOption;
