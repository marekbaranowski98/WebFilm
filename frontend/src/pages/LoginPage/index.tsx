import React, {useState} from 'react';

import './style.css';
import LoginForm from '../../containers/LoginForm';
import LoginOptons from '../../containers/LoginOptons';
import SignInPerks from '../../components/SignInPerks';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);

    return (
      <div className="wrapper-login-page">
          <div className="container-login-menu">
              <h2>Zaloguj się</h2>
              {chooseLoginEmail ?
                  <LoginForm/>
                  :
                  <LoginOptons setChooseLoginEmail={setChooseLoginEmail} />
              }
          </div>
          <SignInPerks />
      </div>
    );
};

export default LoginPage;
