import {get} from '../api';
import {listLatestMovieURL} from './movieRoutes';

export const getListLatestMovies = async () => {
    return get(listLatestMovieURL(), false);
};
