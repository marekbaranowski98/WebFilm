import React from 'react';

import './style.css';

interface SearchProps {
}

const Search: React.FC<SearchProps> = ({}) => {
    return (
        <div className="container-search">
            <input
                type="text"
                className="search-input"
                placeholder="Szukaj"
                tabIndex={0}
                autoFocus
            />
            <div className="button search-button">
                <div className="magnifying-glass" tabIndex={0} />
            </div>
        </div>
    );
}

export default Search;
