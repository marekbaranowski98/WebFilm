import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import LoginForm from '../../containers/LoginForm';
import LoginOptions from '../../containers/LoginOptions';
import SignInPerks from '../../components/SignInPerks';
import {CurrentUserContext} from '../../context/CurrentUserContext';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);
    const userContext = useContext(CurrentUserContext);

    useEffect(() => {
        userContext?.checkIsUserLogged().then(() => setRedirect(true), () => {});
    }, []);

    return (
      <div className="wrapper-form">
          {redirect && <Redirect to={{
              pathname: '/',
          }}/>}
          <div className="box-form">
              <div className="container-form">
              <h2>Zaloguj się</h2>
              {chooseLoginEmail ?
                  <LoginForm/>
                  :
                  <LoginOptions setChooseLoginEmail={setChooseLoginEmail} />
              }
              </div>
          </div>
          <SignInPerks />
      </div>
    );
};

export default LoginPage;
