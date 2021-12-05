import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import {MovieTileType} from '../../types/MovieType';

interface MovieTileProps {
    movie: MovieTileType
}


const MovieTile: React.FC<MovieTileProps> = ({movie}) => {
    return (
        <Link className="movie-tile" to={`/movie/${movie.id}`}>
            <div className="poster-movie-tile">
                <img src={movie.poster_url.poster} alt="Plakat filmowy"/>
            </div>
            <div className="title-movie-tile">{movie.title}</div>
        </Link>
    );
};

export default MovieTile;
