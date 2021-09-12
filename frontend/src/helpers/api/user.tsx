import {post, get} from './api';
import {loginURL, loggedUserURL, logoutUserURL, validateDataUserURL} from './routes';
import {UserLoginForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    const tmpData = data as unknown as Record<string, string>
    return post(loginURL(), tmpData);
}

export const getLoggedUser = async () => {
    return get(loggedUserURL(), true);
}

export const getLogoutUser = async () => {
    return get(logoutUserURL(), true);
}

export const checkDataUser = async (body: Record<string, string>) => {
    return post(validateDataUserURL(), body);
};
