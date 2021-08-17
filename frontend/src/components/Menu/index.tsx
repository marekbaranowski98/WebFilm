import React, {useState} from 'react';

import './style.css';
import menu from '../../images/menu.svg';

interface MenuProps {

}

const Menu: React.FC<MenuProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <div className="container-menu">
            <img src={menu} className="menu" alt="Guzik menu" onClick={() => setIsMenuOpen(true)}/>
            <div className="visibility-menu">
                <input type="checkbox" className="show-menu" checked={isMenuOpen}/>
                <div className="menu-banner">
                    <nav>
                        <div className="menu-content">
                            <div className="button close-menu-button" onClick={() => setIsMenuOpen(false)}>
                                <div className="cross"/>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Menu;
