import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import {MovieTileType} from '../../types/MovieType';

interface MiniMovieTileProps {
    movie: MovieTileType,
    setShowListSearch: (x: boolean) => void,
}

const MiniMovieTile: React.FC<MiniMovieTileProps> = ({movie, setShowListSearch}) => {
    return (
        <Link
            key={movie.id}
            className="mini-tile-movie"
            to={`/movie/${movie.id}`}
            onClick={() => setShowListSearch(false)}
        >
            <img src={movie.poster_url.poster} alt="Plakat filmu"/>
            <p>
                {movie.title}{movie.release_date && <> ({movie.release_date.getFullYear()})</>}
            </p>
        </Link>
    );
};

export default MiniMovieTile;
