import React from 'react';

import './style.css';

interface UserMenu {

}

const UserMenu: React.FC<UserMenu> = () => {
    return (
      <div className="container-user-menu">
          <div className="button">Zaloguj się</div>
          <div className="button">Zarejestruj się</div>
      </div>
    );
};

export default UserMenu;
