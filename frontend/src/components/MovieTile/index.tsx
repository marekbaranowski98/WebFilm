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
            <p className="title-movie-tile">{movie.title}</p>
            <p className="describe-tile">{movie.release_date && movie.release_date.toLocaleDateString()}</p>
        </Link>
    );
};

export default MovieTile;
