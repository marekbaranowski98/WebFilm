import React from 'react';

import './style.css';
import zoom from '../../images/zoom.svg';

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
                <img className="zoom" src={zoom} alt="Guzik szukaj film" />
            </div>
        </div>
    );
}

export default Search;
