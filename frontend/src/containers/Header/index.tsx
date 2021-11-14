import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import logo from '../../images/logo.svg';
import Menu from '../Menu';
import Search from '../../components/Search';
import UserMenu from '../UserMenu';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = React.memo(({}) => {
    const { heightWindow, widthWindow } = useWindowsDimensions();
    return (
        <header className="main-header">
            <div className="content-header">
                <Menu />
                <Link to={'/'}>
                    <img className="logo" src={logo} alt="Logo serwisu" />
                    <h1 className="name-page">WebFilm</h1>
                </Link>
                {widthWindow >= 600 && <Search/>}
                {widthWindow >= 1024 && <UserMenu />}
            </div>
        </header>
    );
});

export default Header;
