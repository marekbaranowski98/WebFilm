import {get, put, delete_api, convertToFormData} from '../api';
import {userRatingForMovieURL, updateUserRatingForMovieURL} from './evaluationsRoutes';
import {UserRatingType, UserRatingIdentityType} from '../../../types/MovieType';

export const getUserRatingForMovie = (movie_id: number) => {
    return get(userRatingForMovieURL(movie_id), true);
};

export const putUserRatingForMovie = (body: UserRatingType) => {
    return put(updateUserRatingForMovieURL(), convertToFormData(body), true);
};

export const deleteUserRatingForMovie = (body: UserRatingIdentityType) => {
    return delete_api(updateUserRatingForMovieURL(), convertToFormData(body), true);
};
