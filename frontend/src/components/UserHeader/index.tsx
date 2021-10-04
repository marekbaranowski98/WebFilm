import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import camera from '../../images/camera.svg';
import settings from '../../images/settings.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {UserObject} from '../../types/UserType';

interface UserHeaderProps {
    user?: UserObject | null;
    show_edit?: boolean,
}

const UserHeader: React.FC<UserHeaderProps> = ({user, show_edit}) => {
    const userContext = useContext(CurrentUserContext);

    return (
        <header>
            {user ?
                <div className="user-header">
                    {(user.id === userContext?.user?.id && show_edit) &&
                        <Link className="link user-settings" to={'/settings/'}>
                            <img src={settings} alt="Ustawienia"/>
                            Ustawienia
                        </Link>
                    }
                    {user.id === userContext?.user?.id ?
                        <div className="settings-avatar">
                            <img src={user.avatar} className="user-avatar" alt="Avatar użytkownika"/>
                            <img src={camera} className="options-avatar" alt="Zmień avatar"/>
                        </div>
                        :
                        <img src={user.avatar} className="user-avatar" alt="Avatar użytkownika"/>
                    }
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
