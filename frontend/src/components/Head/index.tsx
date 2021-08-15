import React from 'react';

import './style.css';
import menu from '../../images/menu.svg';
import logo from '../../images/logo.svg';

const Index = () => {
    return (
        <header className="mainHeader">
            <div className="contentHeader">
                <img className="menu" src={menu} alt="Guzik menu" />
                <img className="logo" src={logo} alt="Logo serwisu" />
                <h1>WebFilm</h1>
            </div>
        </header>
    );
};

export default Index;
