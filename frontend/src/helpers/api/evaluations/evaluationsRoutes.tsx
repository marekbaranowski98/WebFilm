import {SERVER_URL} from '../routes';

const evaluationsURL = (): string => {
    return `${SERVER_URL}evaluations/`;
};

export const userRatingForMovieURL = (movie_id: number): string => {
    return `${evaluationsURL()}movie/${movie_id}/`;
};

export const updateUserRatingForMovieURL = (): string => {
    return evaluationsURL();
};
