import {get} from '../api';
import {listLatestMovieURL, movieDescribeURL, topMoviesByNameURL, topMoviesURL} from './movieRoutes';

export const getListLatestMovies = async () => {
    return get(listLatestMovieURL(), false);
};

export const getMovieDescribe = async (movie_id: string) => {
    return get(movieDescribeURL(movie_id), false);
};

export const getTopMovies = async () => {
    return get(topMoviesURL());
};

export const getTopMoviesByName = async (name: string, value: string) => {
    return get(topMoviesByNameURL(name, value));
};
