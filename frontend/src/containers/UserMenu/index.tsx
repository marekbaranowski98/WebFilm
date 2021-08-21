import React, {useState} from 'react';

import MenuUserContent from '../../components/MenuUserContent';
import NoUserLoginMenu from '../../components/NoUserLoginMenu';

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = () => {
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

    return (
        <div>
            {userIsLogged ?
                <MenuUserContent setUserIsLogged={setUserIsLogged} />
                :
                <NoUserLoginMenu setUserIsLogged={setUserIsLogged} />
            }
        </div>
    );
};

export default UserMenu;
