import {get} from '../api';
import {
    listLatestMovieURL,
    movieDescribeURL,
    premiereMoviesURL,
    recommendationMoviesURL,
    topMoviesByNameURL,
    topMoviesURL
} from './movieRoutes';

export const getListLatestMovies = async () => {
    return get(listLatestMovieURL(), false);
};

export const getMovieDescribe = async (movie_id: string) => {
    return get(movieDescribeURL(movie_id), false);
};

export const getTopMovies = async (search: string | null) => {
    return get(topMoviesURL(search));
};

export const getTopMoviesByName = async (name: string, value: string) => {
    return get(topMoviesByNameURL(name, value));
};

export const getPremiereMovies = async () => {
    return get(premiereMoviesURL());
};

export const getRecommendationMovies = async () => {
    return get(recommendationMoviesURL(), true);
};
