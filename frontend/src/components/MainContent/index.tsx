import React from 'react';

import './style.css';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import Search from '../Search';

interface MainContentProps {

}

const MainContent: React.FC<MainContentProps> = () => {
    const {height, width} = useWindowsDimensions();

    return (
        <div className="main-container">
            {width < 600 ?
                <Search />
                :
                ''
            }
        </div>
    );
};

export default MainContent;
