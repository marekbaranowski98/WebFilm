import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useHistory, useLocation} from 'react-router-dom';

import {AlertType, ResultType} from '../../types/ErrorType';
import ReCaptchaProvider from '../../context/ReCaptchaContext';
import SignInPerks from '../../components/SignInPerks';
import Alert from '../../components/Alert';
import LoginForm from '../../containers/LoginForm';
import LoginOptions from '../../containers/LoginOptions';

interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);
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
            <Helmet>
                <title>Zaloguj się - WebFilm</title>
            </Helmet>
            <div className="box-form">
                {notification && <Alert
                    icon={notification.icon}
                    message={notification.message}
                />}
                <div className="container-form">
                    <h2>Zaloguj się</h2>
                    <ReCaptchaProvider>
                        {chooseLoginEmail ?
                            <LoginForm/>
                            :
                            <LoginOptions setChooseLoginEmail={setChooseLoginEmail}/>
                        }
                    </ReCaptchaProvider>
                </div>
            </div>
            <SignInPerks/>
        </div>
    );
};

export default LoginPage;
