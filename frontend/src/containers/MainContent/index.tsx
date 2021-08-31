import React from 'react';

import './style.css';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import Search from '../../components/Search';

interface MainContentProps {

}

const MainContent: React.FC<MainContentProps> = ({}) => {
    const {height, width} = useWindowsDimensions();

    return (
        <>
            {width < 600 && <Search />}
        </>
    );
};

export default MainContent;
