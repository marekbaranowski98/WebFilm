import {get} from '../api';
import {listLatestMovieURL, movieDescribeURL} from './movieRoutes';

export const getListLatestMovies = async () => {
    return get(listLatestMovieURL(), false);
};

export const getMovieDescribe = async (movie_id: string) => {
    return get(movieDescribeURL(movie_id), false);
};
