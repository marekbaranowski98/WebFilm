import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';

import error from '../../images/error.svg';
import ResetPasswordForm from '../../containers/ResetPasswordForm';
import {validateUUID} from '../../helpers/validators';
import {RedirectType} from '../../types/ErrorType';
import ReCaptchaProvider from '../../context/ReCaptchaContext';

interface ResetPasswordPageProps {
}

interface ResetPasswordPageParams {
    key: string,
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({}) => {
    const {key} = useParams<ResetPasswordPageParams>();
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
        }
    }, []);

    return (
        <div className="wrapper-form">
            {url && <Redirect to={url}/>}
            <div className="box-form">
                <div className="content-container container-form">
                    <h2>Zmień hasło</h2>
                    <ReCaptchaProvider>
                        <ResetPasswordForm uuid={key}/>
                    </ReCaptchaProvider>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
