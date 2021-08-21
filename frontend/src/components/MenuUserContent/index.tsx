import React, {useRef, useState} from 'react';

import './style.css';
import userAvatar from '../../images/user.svg';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';

interface MenuUserContentProps {
}

const MenuUserContent: React.FC<MenuUserContentProps> = () => {
    const wrapperUserMenuRef = useRef<HTMLDivElement>(null);
    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
    const subMenuUser: {id: number, element: string}[] = [
        { id: 1, element: 'Profil', },
        { id: 2, element: 'Rekomendacje filmowe', },
        { id: 3, element: 'Do obejrzenia', },
        { id: 4, element: 'Ocenione filmy', },
        { id: 5, element: 'Wyloguj się', },
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
                        {subMenuUser.map(x => <li key={x.id}>{x.element}</li>)}
                    </ul>
                </div>
                : ''
            }
        </div>
    );
};

export default MenuUserContent;
