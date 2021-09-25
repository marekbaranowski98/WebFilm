import React, {useContext, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';

import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import ResetPasswordForm from '../../containers/ResetPasswordForm';
import {validateUUID} from '../../helpers/validators';
import {RedirectType} from '../../types/ErrorType';

interface ResetPasswordPageProps {
}

interface ResetPasswordPageParams {
    key: string,
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({}) => {
    const {key} = useParams<ResetPasswordPageParams>();
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();
    useEffect(() => {
        if (!validateUUID(key)) {
            setURL({
                pathname: '/reset-password/',
                state: {
                    alertMessage: {
                        icon: error,
                        message: 'Błędny link',
                    },
                },
            });
        } else {
            userContext?.checkIsUserLogged().then((res) => {
                setURL({
                    pathname: '/',
                });
            }, (res) => {
            }).catch((e) => {
                setURL({
                    pathname: '/reset-password/',
                    state: {
                        alertMessage: {
                            icon: error,
                            message: 'Serwis niedostępny',
                        },
                    },
                });
            });
        }
    }, []);

    return (
        <div className="wrapper-form">
            {url && <Redirect to={url}/>}
            <div className="box-form">
                <div className="content-container container-form">
                    <h2>Zmień hasło</h2>
                    <ResetPasswordForm uuid={key}/>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
