import React from 'react';

import './style.css';

interface SearchProps {
}

const Search: React.FC<SearchProps> = ({}) => {
    return (
        <div className="container-search">
            <input
                type="test"
                className="search-input"
                placeholder="Szukaj"
            />
            <div className="button search-button">
                <div className="magnifying-glass" />
            </div>
        </div>
    );
}

export default Search;
