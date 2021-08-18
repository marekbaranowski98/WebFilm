import React from 'react';

import './style.css';
import logo from '../../images/logo.svg';
import Menu from '../Menu';
import Search from '../../components/Search';
import UserMenu from '../../components/UserMenu';

interface HeadProps {

}

const Head: React.FC<HeadProps> = React.memo(() => {
    return (
        <header className="main-header">
            <div className="content-header">
                <Menu />
                <img className="logo" src={logo} alt="Logo serwisu" />
                <h1>WebFilm</h1>
                <Search />
                <UserMenu />
            </div>
        </header>
    );
});

export default Head;
