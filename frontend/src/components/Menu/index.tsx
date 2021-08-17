import React, {useState} from 'react';

import './style.css';
import menu from '../../images/menu.svg';

interface MenuProps {

}

const Menu: React.FC<MenuProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <div className="container-menu">
            <img className="menu" src={menu} alt="Guzik menu" />
            <div className="visibility-menu">

                <div className="menu-banner">
                    <nav>

                    </nav>
                </div>
                <div className="menu-background"></div>
            </div>
        </div>
    );
};

export default Menu;
