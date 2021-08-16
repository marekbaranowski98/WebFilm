import React from 'react';

import './style.css';
import menu from '../../images/menu.svg';

const Menu = () => {
    return (
        <div className="container-menu">
            <img className="menu" src={menu} alt="Guzik menu" />
            <div>
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
