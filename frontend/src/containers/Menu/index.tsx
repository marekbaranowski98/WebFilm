import React, {useRef, useState} from 'react';

import '../../style/shape.css';
import './style.css';
import menu from '../../images/menu.svg';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';
import MenuHeader from '../../components/MenuHeader';

interface MenuProps {

}

const Menu: React.FC<MenuProps> = () => {
    const wrapperMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuName: {id: number, title: string, children: {id: number, element: string}[]}[] = [
        { id: 1, title: "Najnowsze filmy", children: [], },
        { id: 2, title: "Przeglądaj filmy", children: [], },
        { id: 3, title: "Ranking filmów", children: [], },
        {
            id: 4,
            title: "Zarządzaj",
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
            id: 5,
            title: "Dodaj",
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
                                {menuName.map(x =>
                                    <li key={x.id}>
                                        <MenuHeader headerTitle={x.title} subMenuChildren={x.children} />
                                    </li>)
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Menu;
