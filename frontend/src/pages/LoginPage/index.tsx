import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import LoginForm from '../../containers/LoginForm';
import LoginOptions from '../../containers/LoginOptions';
import SignInPerks from '../../components/SignInPerks';
import {AlertType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';

interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);
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
