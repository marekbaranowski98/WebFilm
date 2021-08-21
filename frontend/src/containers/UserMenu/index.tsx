import React, {useState} from 'react';

import './style.css';
import MenuUserContent from '../../components/MenuUserContent';
import LoginUserButton from '../../components/NoUserLoginMenu';
import MenuHeader from "../../components/MenuHeader";

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = () => {
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

    return (
        <div>
            {userIsLogged ?
                <MenuUserContent setUserIsLogged={setUserIsLogged} />
                :
                <LoginUserButton setUserIsLogged={setUserIsLogged}/>
            }
        </div>
    );
};

export default UserMenu;
