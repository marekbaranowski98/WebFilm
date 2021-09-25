import React, {useContext, useEffect, useState} from 'react';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

import {CurrentUserContext} from '../../context/CurrentUserContext';
import LoginForm from '../../containers/LoginForm';
import LoginOptions from '../../containers/LoginOptions';
import SignInPerks from '../../components/SignInPerks';
import {AlertType, RedirectType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';
import error from "../../images/error.svg";

interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const userContext = useContext(CurrentUserContext);
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);
    const [url, setURL] = useState<RedirectType>();
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();

    useEffect(() => {
        userContext?.checkIsUserLogged().then((res) => {
            setURL({
                pathname: '/',
            });
        }, (res) => {
            if (location.state?.alertMessage) {
                setNotification(location.state?.alertMessage);
                history.replace({pathname: location.pathname, state: undefined});
            }
        }).catch((e) => {
            setURL({
                pathname: '/',
                state: {
                    alertMessage: {
                        icon: error,
                        message: 'Serwis niedostępny',
                    },
                },
            })
        });
    }, []);

    return (
        <div className="wrapper-form">
            {url && <Redirect to={url}/>}
            <div className="box-form">
                {notification && <Alert
                    icon={notification.icon}
                    message={notification.message}
                />}
                <div className="container-form">
                    <h2>Zaloguj się</h2>
                    {chooseLoginEmail ?
                        <LoginForm/>
                        :
                        <LoginOptions setChooseLoginEmail={setChooseLoginEmail}/>
                    }
                </div>
            </div>
            <SignInPerks/>
        </div>
    );
};

export default LoginPage;
