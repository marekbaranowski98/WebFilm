import React from 'react';

import './style.css';

interface ListTilesProps {
    children: React.ReactNode[],
    header: string
}

const ListTiles: React.FC<ListTilesProps> = ({children, header}) => {
    return (
        <>
            <h2>{header}</h2>
            <div className="list-tiles">
                {children.length > 0 ? children : <h3>Brak danych</h3>}
            </div>
        </>
    );
};

export default ListTiles;
