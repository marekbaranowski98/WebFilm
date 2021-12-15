import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useLocation, useHistory, Redirect} from 'react-router-dom';

import './style.css';
import ReCaptchaProvider from '../../context/ReCaptchaContext';
import {AlertType, RedirectType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';
import RequestResetPasswordForm from '../../containers/RequestResetPasswordForm';

interface RequestResetPasswordPageProps {
}

const RequestResetPasswordPage: React.FC<RequestResetPasswordPageProps> = ({}) => {
    const [sendResetLink, setSendResetLink] = useState<boolean>(false);
    const [url, setURL] = useState<RedirectType>()
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();

    useEffect(() => {
        if (location.state?.alertMessage) {
            setNotification(location.state?.alertMessage);
            history.replace({pathname: location.pathname, state: undefined});
        }
    }, []);

    return (
        <div className="main-content wrapper-form">
            {url && <Redirect to={url}/>}
            <Helmet>
                <title>Zapomniałem hasło - WebFilm</title>
            </Helmet>
            <div className="box-form">
                {notification && <Alert
                    icon={notification.icon}
                    message={notification.message}
                />}
                <div className="content-container container-form">
                    {sendResetLink ?
                        <>
                            <h2>Sprawdź skrzynkę pocztową</h2>
                            <p>
                                Na podany adres email został wysłany link pozwalający na ustawienie nowego hasła. Jeżeli
                                nie ma go w skrzynce odbiorczej sprawdź spam.
                            </p>
                            <div className="container-button">
                                <Link className="button" to={'/login/'}>Powrót do logowania</Link>
                                <Link className="button" to={'/'}>Powrót na stronę główną</Link>
                            </div>
                        </>
                        :
                        <>
                            <h2>Zresetuj hasło</h2>
                            <ReCaptchaProvider>
                                <RequestResetPasswordForm setSendResetLink={setSendResetLink}/>
                            </ReCaptchaProvider>
                        </>
                    }
                </div>
                {!sendResetLink && <p className="message">Podaj adres email przypisany do swojego konta.</p>}
            </div>
        </div>
    );
};

export default RequestResetPasswordPage;
