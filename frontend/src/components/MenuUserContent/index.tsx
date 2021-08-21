import React, {useRef, useState} from 'react';

import './style.css';
import userAvatar from '../../images/user.svg';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';

interface MenuUserContentProps {
    setUserIsLogged: (userIsLogged: boolean) => void,
}

const MenuUserContent: React.FC<MenuUserContentProps> = ({setUserIsLogged}) => {
    const emptyMethod = () => {

    };

    const logoutUser = () => {
        setUserIsLogged(false);
    };
    const wrapperUserMenuRef = useRef<HTMLDivElement>(null);
    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
    const subMenuUser: {id: number, element: string, handlerClick(): void }[] = [
        { id: 1, element: 'Profil', handlerClick: emptyMethod, },
        { id: 2, element: 'Rekomendacje filmowe', handlerClick: emptyMethod, },
        { id: 3, element: 'Do obejrzenia', handlerClick: emptyMethod, },
        { id: 4, element: 'Ocenione filmy', handlerClick: emptyMethod, },
        { id: 5, element: 'Wyloguj się', handlerClick: logoutUser, },
    ];

    AutoHideOutsideClick(wrapperUserMenuRef, showSubMenu, setShowSubMenu);

    return (
        <div className="container-user-menu-submenu" ref={wrapperUserMenuRef}>
            <div className="container-user-menu expend-container">
                <img src={userAvatar} alt="Avatar użytkownika"/>
                <div className="info-user-menu">
                    <div className="info-user-name">Imię</div>
                    <div className="info-user-login">@Login</div>
                </div>
                <input type="checkbox" className="hidden-checkbox" defaultChecked={showSubMenu} />
                <div className="arrow arrow-down expend-button" onClick={() => setShowSubMenu(!showSubMenu)}/>
            </div>
            {showSubMenu ?
                <div className="container-submenu">
                    <ul className="submenu">
                        {subMenuUser.map(x => <li key={x.id} onClick={x.handlerClick}>{x.element}</li>)}
                    </ul>
                </div>
                : ''
            }
        </div>
    );
};

export default MenuUserContent;
