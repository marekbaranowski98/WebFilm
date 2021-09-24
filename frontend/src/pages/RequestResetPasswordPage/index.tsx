import React, {useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

import './style.css';
import RequestResetPasswordForm from '../../containers/RequestResetPasswordForm';
import {AlertType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';

interface RequestResetPasswordPageProps {
}

const RequestResetPasswordPage: React.FC<RequestResetPasswordPageProps> = ({}) => {
    const [sendResetLink, setSendResetLink] = useState<boolean>(false);
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();

    useEffect(() => {
       if(location.state?.alertMessage) {
           setNotification(location.state?.alertMessage);
           history.replace({ pathname: location.pathname, state: undefined });
       }
    }, []);

    return (
        <div className="wrapper-form">
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
                                Na podany adres email został wysłany link pozwalający na ustawienie nowego hasła. Jeżeli nie ma go w skrzynce odbiorczej sprawdź spam.
                            </p>
                            <div className="container-button">
                                <Link className="button" to={'/login/'}>Powrót do logowania</Link>
                                <Link className="button" to={'/'}>Powrót na stronę główną</Link>
                            </div>
                        </>
                        :
                        <>
                            <h2>Zresetuj hasło</h2>
                            <RequestResetPasswordForm setSendResetLink={setSendResetLink}/>
                        </>
                    }
                </div>
                {!sendResetLink && <p className="message">Podaj adres email przypisany do swojego konta.</p>}
            </div>
        </div>
    );
};

export default RequestResetPasswordPage;
