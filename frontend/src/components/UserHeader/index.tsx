import React, {useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import settings from '../../images/settings.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {UserObject} from '../../types/UserType';
import {getImage} from '../../helpers/api/photo';

interface UserHeaderProps {
    user?: UserObject;
}

const UserHeader: React.FC<UserHeaderProps> = ({user}) => {
    const [avatar, setAvatar] = useState<string>();
    const userContext = useContext(CurrentUserContext);

    useEffect(() => {
        if(user) {
            getImage('users', user.avatarURL).then((image) => {
                setAvatar(`data:image/png;base64,${image}`);
            });
        }
    }, [user]);

    return (
        <header>
            {user ?
                <div className="user-header">
                    {user.id === userContext?.user?.id &&
                        <Link className="link user-setting" to={'/settings/'}>
                            <img src={settings} alt="Ustawienia"/>
                            Ustawienia
                        </Link>
                    }
                    <img src={avatar} className="user-avatar" alt="Avatar użytkownika"/>
                    <div className="user-identity">
                        <h2>{user.name} {user.surname}</h2>
                        <p>@{user.login}</p>
                    </div>
                </div>
                :
                <div className="user-error">
                    <h2>Nie ma takiego użytkownika</h2>
                    <Link to={'/'}>
                        <div className="button">
                            Powrót na stronę główną
                        </div>
                    </Link>
                </div>
            }
        </header>
    );
};

export default UserHeader;
