import {SERVER_URL} from '../routes';

const movieURL = (): string => {
    return `${SERVER_URL}movies/`;
};

export const listLatestMovieURL = (): string => {
    return `${movieURL()}latest/`;
};

export const movieDescribeURL = (movie_id: string): string => {
    return `${movieURL()}${movie_id}/`;
};
