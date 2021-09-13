import {post, get} from './api';
import {loginURL, loggedUserURL, logoutUserURL, validateDataUserURL, registerUserURL} from './routes';
import {UserLoginForm, UserRegisterForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    const tmpData = data as unknown as Record<string, string>
    return post(loginURL(), tmpData);
};

export const getLoggedUser = async () => {
    return get(loggedUserURL(), true);
};

export const getLogoutUser = async () => {
    return get(logoutUserURL(), true);
};

export const checkDataUser = async (body: Record<string, string>) => {
    return post(validateDataUserURL(), body, false);
};

export const registerUser = async (data: UserRegisterForm) => {
    const tmpData = data as unknown as Record<string, string>
    return post(registerUserURL(), tmpData, false);
};
