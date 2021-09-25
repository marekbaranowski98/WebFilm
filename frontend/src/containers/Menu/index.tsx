import React, {useEffect, useRef, useState} from 'react';

import './style.css';
import menu from '../../images/menu.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';
import MenuHeader from '../../components/MenuHeader';
import MenuUserContent from '../../components/MenuUserContent';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import {UserRole} from '../../types/UserType';

interface MenuProps {

}

const Menu: React.FC<MenuProps> = ({}) => {
    const checkIsSmallScreen = (): boolean => {
        return width < 1024;
    };

    const wrapperMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [loggedUserRole, setLoggedUserRole] = useState<UserRole>(UserRole.AnonymousUser);
    const { height, width } = useWindowsDimensions();
    const userContext = React.useContext(CurrentUserContext);
    const menuName: { id: number, title: string, visibility: boolean, link: string,
            children: { id: number, element: string, link: string, }[] }[] = [
        {
            id: 1,
            title: 'Zaloguj się',
            visibility: loggedUserRole == UserRole.AnonymousUser && checkIsSmallScreen(),
            link: '/login/',
            children: [],
        },
        {
            id: 2,
            title: 'Zarejestruj się',
            visibility: loggedUserRole == UserRole.AnonymousUser && checkIsSmallScreen(),
            link: '/register/',
            children: [],
        },
        { id: 3, title: 'Najnowsze filmy', visibility: true, link: '#', children: [], },
        { id: 4, title: 'Przeglądaj filmy', visibility: true, link: '#', children: [], },
        { id: 5, title: 'Ranking filmów', visibility: true, link: '#', children: [], },
        {
            id: 6,
            title: 'Zarządzaj',
            visibility: loggedUserRole >= UserRole.Moderator,
            link: '#',
            children: [
                { id: 1, element: 'Zarządzaj filmami', link: '#',},
                { id: 2, element: 'Zarządzaj gatunkami', link: '#', },
                { id: 3, element: 'Zarządzaj kolekcjami', link: '#', },
                { id: 4, element: 'Zarządzaj producentami', link: '#', },
                { id: 5, element: 'Zarządzaj postaciami', link: '#', },
                { id: 6, element: 'Zarządzaj krajami', link: '#', },
                { id: 7, element: 'Zarządzaj językami', link: '#', },
                { id: 8, element: 'Zarządzaj słowami kluczowymi', link: '#', },
            ],
        },
        {
            id: 7,
            title: 'Dodaj',
            visibility: loggedUserRole >= UserRole.Moderator,
            link: '#',
            children: [
                { id: 1, element: 'Dodaj film', link: '#', },
                { id: 2, element: 'Dodaj gatunek', link: '#', },
                { id: 3, element: 'Dodaj kolekcje', link: '#', },
                { id: 4, element: 'Dodaj producenta', link: '#', },
                { id: 5, element: 'Dodaj postać', link: '#', },
                { id: 6, element: 'Dodaj kraj', link: '#', },
                { id: 7, element: 'Dodaj język', link: '#', },
                { id: 8, element: 'Dodaj słowo kluczowe', link: '#', },
            ],
        },
    ];

    useEffect(() => {
        userContext?.checkIsUserLogged().then((r) => setLoggedUserRole(r), (e) => setLoggedUserRole(e));
    }, [userContext?.user]);

    AutoHideOutsideClick(wrapperMenuRef, isMenuOpen, setIsMenuOpen);

    return (
        <div className="container-menu">
            <img src={menu} className="menu" alt="Guzik menu" onClick={() => setIsMenuOpen(true)} />
            <div className="visibility-menu">
                <input type="checkbox" className="hidden-checkbox" checked={isMenuOpen} readOnly={true}/>
                <div className="menu-banner" ref={wrapperMenuRef}>
                    <nav>
                        <div className="menu-content">
                            <div className="button close-menu-button" onClick={() => setIsMenuOpen(false)}>
                                <div className="cross"/>
                            </div>
                            <ul>
                                {(checkIsSmallScreen() && loggedUserRole) &&
                                    <li><MenuUserContent/></li>
                                }
                                {menuName.map(x => x.visibility &&
                                    <li key={x.id}>
                                        <MenuHeader headerTitle={x.title} link={x.link} subMenuChildren={x.children} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Menu;
