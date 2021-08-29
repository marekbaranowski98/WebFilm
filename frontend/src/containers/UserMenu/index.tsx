import React, {useState} from 'react';

import MenuUserContent from '../../components/MenuUserContent';
import NoUserLoginMenu from '../../components/LoginUserButton';

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = ({}) => {
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

    return (
        <div>
            {userIsLogged ?
                <MenuUserContent setUserIsLogged={setUserIsLogged} />
                :
                <NoUserLoginMenu />
            }
        </div>
    );
};

export default UserMenu;
