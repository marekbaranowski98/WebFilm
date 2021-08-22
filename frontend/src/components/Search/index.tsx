import React from 'react';

import './style.css';

interface Search {

}

const Search: React.FC<Search> = () => {
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
