import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import RequestResetPasswordForm from '../../containers/RequestResetPasswordForm';

import './style.css';

interface RequestResetPasswordProps {
}

const RequestResetPassword: React.FC<RequestResetPasswordProps> = ({}) => {
    const [sendResetLink, setSendResetLink] = useState<boolean>(false)

    return (
        <div className="wrapper-form">
            <div className="box-form">
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

export default RequestResetPassword;
