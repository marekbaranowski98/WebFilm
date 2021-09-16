import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {getImage} from '../../helpers/api/photo';

interface MenuUserContentProps {
}

const MenuUserContent: React.FC<MenuUserContentProps> = () => {
    const wrapperUserMenuRef = useRef<HTMLDivElement>(null);
    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('');
    const userContext = React.useContext(CurrentUserContext);

    useEffect(() => {
        if(userContext && userContext.user) {
            getImage('users', userContext?.user?.avatarURL).then((a) => {
               setAvatar(`data:image/png;base64,${a}`);
            });
        }
    }, [userContext?.user]);

    const subMenuUser: {id: number, element: string, link: string, }[] = [
        { id: 1, element: 'Profil', link: '#', },
        { id: 2, element: 'Rekomendacje filmowe', link: '#', },
        { id: 3, element: 'Do obejrzenia', link: '#', },
        { id: 4, element: 'Ocenione filmy', link: '#',},
        { id: 5, element: 'Wyloguj się', link: '/logout/', },
    ];

    AutoHideOutsideClick(wrapperUserMenuRef, showSubMenu, setShowSubMenu);

    return (
        <div className="container-user-menu-submenu" ref={wrapperUserMenuRef}>
            <div className="container-user-menu expend-container">
                <img src={avatar} alt="Avatar użytkownika"/>
                <div className="info-user-menu">
                    <div className="info-user-name">{userContext?.user?.name}</div>
                    <div className="info-user-login">@{userContext?.user?.login}</div>
                </div>
                <input type="checkbox" className="hidden-checkbox" defaultChecked={showSubMenu} />
                <div className="arrow arrow-down expend-button" onClick={() => setShowSubMenu(!showSubMenu)}/>
            </div>
            {showSubMenu &&
                <div className="container-submenu">
                    <ul className="submenu">
                        {subMenuUser.map(x =>
                            <li key={x.id}>
                                <Link className="submenu-option" to={x.link}>{x.element}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
};

export default MenuUserContent;
