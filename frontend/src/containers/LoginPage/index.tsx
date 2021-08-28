import React from 'react';

import './style.css';
import LoginOptons from '../../components/LoginOptons';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = () => {
    return (
      <>
          <div className="container-login-menu">
              <h2>Zaloguj się</h2>
              <LoginOptons />
          </div>

      </>
    );
};

export default LoginPage;
