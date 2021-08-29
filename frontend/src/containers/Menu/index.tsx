import React, {useRef, useState} from 'react';

import '../../style/shape.css';
import './style.css';
import menu from '../../images/menu.svg';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';
import MenuHeader from '../../components/MenuHeader';
import MenuUserContent from '../../components/MenuUserContent';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';

interface MenuProps {

}

const Menu: React.FC<MenuProps> = ({}) => {
    const checkIsUserLogin = (): boolean => {
        return true;
    };

    const checkUserIsAdmin = (): boolean => {
        return true;
    };

    const checkIsSmallScreen = (): boolean => {
        return width < 1024;
    }

    const wrapperMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { height, width } = useWindowsDimensions();
    const menuName: { id: number, title: string, visibility: boolean, link: string,
            children: { id: number, element: string }[] }[] = [
        {
            id: 1,
            title: "Zaloguj się",
            visibility: checkIsUserLogin() && checkIsSmallScreen(),
            link: "/login",
            children: [],
        },
        { id: 2, title: "Zarejestruj się", visibility: checkIsUserLogin() && checkIsSmallScreen(), link: "#", children: [], },
        { id: 3, title: "Najnowsze filmy", visibility: true, link: "#", children: [], },
        { id: 4, title: "Przeglądaj filmy", visibility: true, link: "#", children: [], },
        { id: 5, title: "Ranking filmów", visibility: true, link: "#", children: [], },
        {
            id: 6,
            title: "Zarządzaj",
            visibility: checkUserIsAdmin(),
            link: "#",
            children: [
                { id: 1, element: "Zarządzaj filmami", },
                { id: 2, element: "Zarządzaj gatunkami", },
                { id: 3, element: "Zarządzaj kolekcjami", },
                { id: 4, element: "Zarządzaj producentami", },
                { id: 5, element: "Zarządzaj postaciami", },
                { id: 6, element: "Zarządzaj krajami", },
                { id: 7, element: "Zarządzaj językami", },
                { id: 8, element: "Zarządzaj słowami kluczowymi", },
            ],
        },
        {
            id: 7,
            title: "Dodaj",
            visibility: checkUserIsAdmin(),
            link: "#",
            children: [
                { id: 1, element: "Dodaj film", },
                { id: 2, element: "Dodaj gatunek", },
                { id: 3, element: "Dodaj kolekcje", },
                { id: 4, element: "Dodaj producenta", },
                { id: 5, element: "Dodaj postać", },
                { id: 6, element: "Dodaj kraj", },
                { id: 7, element: "Dodaj język", },
                { id: 8, element: "Dodaj słowo kluczowe", },
            ],
        },
    ];

    AutoHideOutsideClick(wrapperMenuRef, isMenuOpen, setIsMenuOpen);

    return (
        <div className="container-menu">
            <img src={menu} className="menu" alt="Guzik menu" onClick={() => setIsMenuOpen(true)}/>
            <div className="visibility-menu">
                <input type="checkbox" className="hidden-checkbox" checked={isMenuOpen} readOnly={true}/>
                <div className="menu-banner" ref={wrapperMenuRef}>
                    <nav>
                        <div className="menu-content">
                            <div className="button close-menu-button" onClick={() => setIsMenuOpen(false)}>
                                <div className="cross"/>
                            </div>
                            <ul>
                                {checkIsSmallScreen() ?
                                    <li key="9"><MenuUserContent setUserIsLogged={setIsMenuOpen} /></li>
                                    :
                                    ''
                                }
                                {menuName.map(x => x.visibility ?
                                    <li key={x.id}>
                                        <MenuHeader headerTitle={x.title} link={x.link} subMenuChildren={x.children} />
                                    </li> : ''
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
