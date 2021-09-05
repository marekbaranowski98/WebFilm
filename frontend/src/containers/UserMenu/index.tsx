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
        userContext?.checkIsUserLogged().then(r => setUserIsLogged(r), e => setUserIsLogged(e));
    }, [userContext?.user]);

    return (
        <div>
            {userIsLogged ?
                <MenuUserContent setUserIsLogged={setUserIsLogged} currentUser={userContext?.user}/>
                :
                <NoUserLoginMenu/>
            }
        </div>
    );
};

export default UserMenu;
