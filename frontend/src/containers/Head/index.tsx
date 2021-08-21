import React from 'react';

import './style.css';
import logo from '../../images/logo.svg';
import Menu from '../Menu';
import Search from '../../components/Search';
import UserMenu from '../UserMenu';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';

interface HeadProps {

}

const Head: React.FC<HeadProps> = React.memo(() => {
    const { height, width } = useWindowsDimensions();
    return (
        <header className="main-header">
            <div className="content-header">
                <Menu />
                <img className="logo" src={logo} alt="Logo serwisu" />
                <h1>WebFilm</h1>
                {width >= 600 ?
                    <Search/>
                    :
                    ''
                }
                {width >= 1024 ?
                    <UserMenu />
                    :
                    ''
                }
            </div>
        </header>
    );
});

export default Head;
