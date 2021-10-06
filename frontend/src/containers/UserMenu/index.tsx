import React, {useEffect, useState} from 'react';

import {CurrentUserContext} from '../../context/CurrentUserContext';
import MenuUserContent from '../../components/MenuUserContent';
import NoUserLoginMenu from '../../components/LoginUserButton';

interface UserMenuProps {
}

const UserMenu: React.FC<UserMenuProps> = ({}) => {
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
    const userContext = React.useContext(CurrentUserContext);

    useEffect(() => {
        if (userContext?.user) {
            setUserIsLogged(true);
        } else {
            setUserIsLogged(false);
        }
    }, [userContext?.user]);

    return (
        <div>
            {userIsLogged ?
                <MenuUserContent/>
                :
                <NoUserLoginMenu/>
            }
        </div>
    );
};

export default UserMenu;
