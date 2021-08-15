import React from "react";

import './style.css';
import zoom from '../../images/zoom.svg';

const Search = () => {
    return (
        <div className="container-search">
            <input
                type="test"
                className="search-input"
                placeholder="Szukaj"
            />
            <div className="search-button">
                <img className="zoom" src={zoom} alt="Guzik szukaj film" />
            </div>
        </div>
    );
}

export default Search;
