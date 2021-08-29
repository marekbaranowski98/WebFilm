import React from 'react';

import './style.css';
import LoginOptons from '../../components/LoginOptons';
import SignInPerks from '../../components/SignInPerks';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = () => {
    return (
      <div className="wrapper-login-page">
          <div className="container-login-menu">
              <h2>Zaloguj się</h2>
              <LoginOptons />
          </div>
          <SignInPerks />
      </div>
    );
};

export default LoginPage;
