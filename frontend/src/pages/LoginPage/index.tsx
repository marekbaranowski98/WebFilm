import React, {useState} from 'react';

import LoginForm from '../../containers/LoginForm';
import LoginOptions from '../../containers/LoginOptions';
import SignInPerks from '../../components/SignInPerks';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
    const [chooseLoginEmail, setChooseLoginEmail] = useState<boolean>(false);

    return (
      <div className="wrapper-form">
          <div className="container-form">
              <h2>Zaloguj się</h2>
              {chooseLoginEmail ?
                  <LoginForm/>
                  :
                  <LoginOptions setChooseLoginEmail={setChooseLoginEmail} />
              }
          </div>
          <SignInPerks />
      </div>
    );
};

export default LoginPage;
